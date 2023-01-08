import Fastify from 'fastify';

import { requestHandler } from '../dist/request-handler.cjs';

import { register } from './register.mjs';

const app = new Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

register(app);

app.get('*', {}, requestHandler);

app.listen({ port: 3000 });
