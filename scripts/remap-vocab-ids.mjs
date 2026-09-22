import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function idsFrom(file, prefix) {
  const text = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`buildVocab\\('(${prefix}\\d+)'`, 'g');
  const ids = [];
  let m;
  while ((m = re.exec(text))) ids.push(m[1]);
  return ids;
}

const a2 = idsFrom(path.join(root, 'src/content/vocabulary/a2.ts'), 'vocab-a2-');
const b1 = idsFrom(path.join(root, 'src/content/vocabulary/b1.ts'), 'vocab-b1-');
console.log('a2', a2[0], a2.at(-1), a2.length);
console.log('b1', b1[0], b1.at(-1), b1.length);

const modDir = path.join(root, 'src/content/modules');
for (const file of fs.readdirSync(modDir)) {
  if (!file.endsWith('.ts')) continue;
  if (['index.ts', 'moduleFactory.ts', 'exerciseHelpers.ts'].includes(file)) continue;
  const level = file.startsWith('a2') ? 'a2' : file.startsWith('b1') ? 'b1' : null;
  if (!level) continue;
  const pool = level === 'a2' ? a2 : b1;
  let text = fs.readFileSync(path.join(modDir, file), 'utf8');
  let i = 0;
  text = text.replace(/vocab-(a2|b1)-\d+/g, (match) => {
    if (
      (level === 'a2' && match.startsWith('vocab-a2-')) ||
      (level === 'b1' && match.startsWith('vocab-b1-'))
    ) {
      const next = pool[i % pool.length];
      i += 1;
      return next;
    }
    return match;
  });
  fs.writeFileSync(path.join(modDir, file), text);
  console.log('remapped', file, 'refs', i);
}
