import { language } from 'src/server/handlers/language';

import type { RouteOptions } from 'fastify';

export default [
  {
    method: 'POST',
    url: '/session/language',
    handler: language,
    schema: {
      body: {
        lng: { type: 'string' },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
] as RouteOptions[];
