import { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from '@/state/AppState';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppShell } from '@/components/Layout/AppShell';
import { WelcomePage } from '@/pages/WelcomePage';
import { HomePage } from '@/pages/HomePage';
import { CurriculumPage } from '@/pages/CurriculumPage';
import { LessonPage } from '@/pages/LessonPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { PracticePage } from '@/pages/PracticePage';
import { AssessmentsPage } from '@/pages/AssessmentsPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { AboutPage } from '@/pages/AboutPage';
import { WardrobePage } from '@/pages/WardrobePage';

const BattleLobbyPage = lazy(() =>
  import('@/pages/BattlePage').then((m) => ({ default: m.BattleLobbyPage })),
);
const BattleRoomPage = lazy(() =>
  import('@/pages/BattlePage').then((m) => ({ default: m.BattleRoomPage })),
);

function BattleFallback() {
  return (
    <section className="card card--panel">
      <h1>Loading battle…</h1>
    </section>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppStateProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route element={<AppShell />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/lesson/:moduleId/:lessonId" element={<LessonPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/wardrobe" element={<WardrobePage />} />
              <Route
                path="/battle"
                element={
                  <Suspense fallback={<BattleFallback />}>
                    <BattleLobbyPage />
                  </Suspense>
                }
              />
              <Route
                path="/battle/:code"
                element={
                  <Suspense fallback={<BattleFallback />}>
                    <BattleRoomPage />
                  </Suspense>
                }
              />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AppStateProvider>
    </ErrorBoundary>
  );
}
