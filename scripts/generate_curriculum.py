# -*- coding: utf-8 -*-
"""Generates vocabulary TS files and module TS files for Samen Nederlands curriculum."""
from __future__ import annotations
import json
import os
import textwrap

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOCAB_DIR = os.path.join(ROOT, "src", "content", "vocabulary")
MOD_DIR = os.path.join(ROOT, "src", "content", "modules")


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def build_vocab_line(entry: dict) -> str:
    extra = ""
    parts = []
    if entry.get("article"):
        parts.append(f"article: '{entry['article']}'")
    if entry.get("plural"):
        parts.append(f"plural: '{esc(entry['plural'])}'")
    if entry.get("notes"):
        parts.append(f"notes: '{esc(entry['notes'])}'")
    if parts:
        extra = ", { " + ", ".join(parts) + " }"
    return (
        f"  buildVocab('{entry['id']}', '{esc(entry['dutch'])}', '{esc(entry['english'])}', "
        f"'{entry['wordType']}', '{entry['level']}', '{esc(entry['topic'])}', "
        f"'{esc(entry['exampleNl'])}', '{esc(entry['exampleEn'])}'{extra}),"
    )


def load_vocab_entries() -> list[dict]:
    data_path = os.path.join(os.path.dirname(__file__), "vocab_data.json")
    with open(data_path, encoding="utf-8") as f:
        return json.load(f)


def write_vocab_files(entries: list[dict]) -> None:
    by_level: dict[str, list[dict]] = {"pre-a1": [], "a1": [], "a2": [], "b1": []}
    for e in entries:
        by_level[e["level"]].append(e)

    names = {
        "pre-a1": ("preA1.ts", "vocabularyPreA1Items"),
        "a1": ("a1.ts", "vocabularyA1Items"),
        "a2": ("a2.ts", "vocabularyA2Items"),
        "b1": ("b1.ts", "vocabularyB1Items"),
    }
    for level, items in by_level.items():
        fname, export = names[level]
        lines = [build_vocab_line(e) for e in items]
        content = (
            "import { buildVocab } from './buildItem';\n"
            "import type { VocabularyItem } from '../types';\n\n"
            f"export const {export}: VocabularyItem[] = [\n"
            + "\n".join(lines)
            + "\n];\n"
        )
        with open(os.path.join(VOCAB_DIR, fname), "w", encoding="utf-8") as f:
            f.write(content)

    index = """import type { VocabularyItem } from '../types';
import { vocabularyPreA1Items } from './preA1';
import { vocabularyA1Items } from './a1';
import { vocabularyA2Items } from './a2';
import { vocabularyB1Items } from './b1';

export const vocabularyItems: VocabularyItem[] = [
  ...vocabularyPreA1Items,
  ...vocabularyA1Items,
  ...vocabularyA2Items,
  ...vocabularyB1Items,
];

export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabularyItems.find((v) => v.id === id);
}

export function getVocabularyByLevel(level: VocabularyItem['level']): VocabularyItem[] {
  return vocabularyItems.filter((v) => v.level === level);
}
"""
    with open(os.path.join(VOCAB_DIR, "index.ts"), "w", encoding="utf-8") as f:
        f.write(index)
    print(f"Vocabulary: {len(entries)} items")


def ex_mc(mid, lid, n, prompt, prompt_en, options, answer, expl, skill, diff=1):
    opts = ", ".join(f"'{esc(o)}'" for o in options)
    ans = ", ".join(f"'{esc(a)}'" for a in ([answer] if isinstance(answer, str) else answer))
    return f"""  mc({{
    id: '{mid}-ex-{n:02d}',
    moduleId: '{mid}',
    lessonId: '{lid}',
    prompt: '{esc(prompt)}',
    promptEn: '{esc(prompt_en)}',
    options: [{opts}],
    acceptedAnswers: [{ans}],
    explanation: '{esc(expl)}',
    skill: '{skill}',
    difficulty: {diff},
  }}),"""


def write_module_file(spec: dict) -> None:
    mid = spec["id"]
    exercises = []
    ex_num = 1
    lesson_blocks = []
    for lesson in spec["lessons"]:
        lid = lesson["id"]
        ex_ids = []
        for q in lesson.get("questions", []):
            exercises.append(
                ex_mc(mid, lid, ex_num, q["prompt"], q.get("promptEn", ""), q["options"], q["answer"], q["expl"], q["skill"], q.get("diff", 1))
            )
            ex_ids.append(f"'{mid}-ex-{ex_num:02d}'")
            ex_num += 1
        steps_code = []
        for step in lesson["steps"]:
            if step["type"] == "explanation":
                steps_code.append(
                    f"""      {{
        type: 'explanation',
        title: '{esc(step['title'])}',
        body: '{esc(step['body'])}',
      }},"""
                )
            elif step["type"] == "examples":
                items = ",\n".join(
                    f"          {{ nl: '{esc(it['nl'])}', en: '{esc(it['en'])}' }}" for it in step["items"]
                )
                steps_code.append(
                    f"""      {{
        type: 'examples',
        title: '{esc(step['title'])}',
        items: [
{items}
        ],
      }},"""
                )
            elif step["type"] == "vocabulary":
                vids = ", ".join(f"'{v}'" for v in step["vocabIds"])
                steps_code.append(
                    f"""      {{
        type: 'vocabulary',
        title: '{esc(step['title'])}',
        vocabularyIds: [{vids}],
      }},"""
                )
            elif step["type"] == "exercise":
                ids = ex_ids if step.get("useLessonQuestions") else [f"'{i}'" for i in step.get("exerciseIds", ex_ids)]
                steps_code.append(
                    f"""      {{
        type: 'exercise',
        exerciseIds: [{", ".join(ids)}],
      }},"""
                )
            elif step["type"] == "summary":
                bullets = ",\n".join(f"          '{esc(b)}'" for b in step["bullets"])
                steps_code.append(
                    f"""      {{
        type: 'summary',
        title: '{esc(step['title'])}',
        bullets: [
{bullets}
        ],
      }},"""
                )
        lesson_blocks.append(
            f"""    {{
      id: '{lid}',
      title: '{esc(lesson['title'])}',
      objective: '{esc(lesson['objective'])}',
      steps: [
{"".join(steps_code)}
      ],
    }},"""
        )

    cp_ids = []
    for q in spec["checkpoint"]:
        exercises.append(
            ex_mc(mid, None, ex_num, q["prompt"], q.get("promptEn", ""), q["options"], q["answer"], q["expl"], q["skill"], q.get("diff", 2))
        )
        cp_ids.append(f"'{mid}-ex-{ex_num:02d}'")
        ex_num += 1

    gf = ", ".join(f"'{esc(g)}'" for g in spec["grammarFocus"])
    vf = ", ".join(f"'{esc(v)}'" for v in spec["vocabularyFocus"])
    sk = ", ".join(f"'{s}'" for s in spec["skills"])

    export_name = "module" + "".join(p.capitalize() for p in mid.replace("-", " ").split())

    content = f"""import {{ createModule }} from './moduleFactory';
import {{ mc }} from './exerciseHelpers';
import type {{ Exercise }} from '../types';

const moduleId = '{mid}';

const lessonExercises: Exercise[] = [
{"".join(exercises[: len(exercises) - len(spec["checkpoint"])])}
];

const checkpoint: Exercise[] = [
{"".join(exercises[len(exercises) - len(spec["checkpoint"]) :])}
];

export const {export_name} = createModule(
  {{
    id: moduleId,
    level: '{spec["level"]}',
    title: '{esc(spec["title"])}',
    titleNl: '{esc(spec["titleNl"])}',
    topic: '{esc(spec["topic"])}',
    grammarFocus: [{gf}],
    vocabularyFocus: [{vf}],
    skills: [{sk}],
    description: '{esc(spec["description"])}',
    order: {spec["order"]},
  }},
  [
{"".join(lesson_blocks)}
  ],
  lessonExercises,
  checkpoint,
);
"""
    fname = spec["file"]
    with open(os.path.join(MOD_DIR, fname), "w", encoding="utf-8") as f:
        f.write(content)


def main() -> None:
    entries = load_vocab_entries()
    write_vocab_files(entries)
    modules_path = os.path.join(os.path.dirname(__file__), "modules_data.json")
    with open(modules_path, encoding="utf-8") as f:
        modules = json.load(f)
    for m in modules:
        write_module_file(m)
    print(f"Modules: {len(modules)}")


if __name__ == "__main__":
    main()
