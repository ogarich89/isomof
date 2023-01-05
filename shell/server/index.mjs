import Fastify from 'fastify';

// eslint-disable-next-line no-restricted-imports
import { requestHandler } from '../dist/request-handler.cjs';

import { register } from './register.mjs';

const app = new Fastify({
  logger: {
    level: 'error',
    transport: {
      target: 'pino-pretty',
    },
  },
});

register(app);

app.get('*', {}, requestHandler);

app.listen({ port: 3000 });
