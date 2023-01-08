import serve from '@fastify/static';

import { resolve } from 'path';

import type { FastifyInstance } from 'fastify';

const register = (app: FastifyInstance) => {
  app.register(serve, {
    root: resolve(__dirname, '../public'),
    prefix: '/public',
  });
  app.register(serve, {
    root: resolve(__dirname, '../dist'),
    prefix: '/dist',
    decorateReply: false,
  });
};

export { register };
