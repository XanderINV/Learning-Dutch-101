import { modules } from '@/content/curriculum';
import { unlockModulesForLevel } from '@/lib/progress';
import { useAppState } from '@/state/AppState';
import { ModuleCard } from '@/components/ModuleCard';
import { EmptyState } from '@/components/EmptyState';

export function CurriculumPage() {
  const { activeProfile } = useAppState();
  const level = activeProfile.progress.currentLevel;
  const progress = unlockModulesForLevel(activeProfile.progress, modules, level);
  const levelModules = modules
    .filter((m) => m.level === level)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <header className="page-header">
        <h1>Curriculum map</h1>
        <p>
          Your current focus level is <strong>{level.toUpperCase()}</strong>.
          Modules unlock in order within each level.
        </p>
      </header>
      {levelModules.length === 0 ? (
        <EmptyState
          title="Curriculum coming soon"
          description="Lesson modules are being authored. Validation and the lesson player are wired — content will appear here automatically."
        />
      ) : (
        <div className="grid-cards">
          {levelModules.map((mod, index) => {
            const entry = progress.modules.find((m) => m.moduleId === mod.id);
            return (
              <ModuleCard
                key={mod.id}
                module={mod}
                completedLessons={entry?.lessonsCompleted.length ?? 0}
                unlocked={entry?.unlocked ?? index === 0}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
