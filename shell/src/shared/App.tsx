import { lazy, Suspense } from 'react';

import { Shell } from './components/Shell';

import type { FunctionComponent } from 'react';

const Remote = lazy(() => import('remote/Remote'));

export const App: FunctionComponent = () => {
  return (
    <>
      <Shell />
      <Suspense fallback="Loading...">
        <Remote />
      </Suspense>
    </>
  );
};
