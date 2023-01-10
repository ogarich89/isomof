import cookie from '@fastify/cookie';
import session from '@fastify/session';
import serve from '@fastify/static';

import { resolve } from 'path';

import type { FastifyInstance } from 'fastify';

const register = (app: FastifyInstance) => {
  app.register(cookie);

  app.register(session, {
    cookieName: 'session_id',
    cookie: { secure: false },
    secret: 'VY0{W6C3u@syL>H((&^RQU"Q-t%gYfVl]vhVIT;xql3JTS$-B`Ek1264S}sX_49',
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
