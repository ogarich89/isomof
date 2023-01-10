import { lazy, Suspense } from 'react';

import { ErrorBoundary } from './components/ErrorBoundary';
import { Shell } from './components/Shell';
import { Header } from './layouts/Header';

import type { FunctionComponent } from 'react';

const Remote = lazy(() => import('remote/Remote'));

export const App: FunctionComponent = () => {
  return (
    <>
      <Header />
      <Shell />
      <ErrorBoundary>
        <Suspense fallback="Loading...">
          <Remote />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
