import { hydrateRoot } from 'react-dom/client';

import { App } from 'src/shared/App';

hydrateRoot(document.getElementById('root') as HTMLDivElement, <App />);
