import serve from '@fastify/static';
import view from '@fastify/view';
import ejs from 'ejs';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const register = (app) => {
  app.register(view, {
    engine: {
      ejs,
    },
    root: resolve(__dirname, '../public'),
  });

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
