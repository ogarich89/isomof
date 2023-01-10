import fastify from 'fastify';

import { register } from './register';
import { requestHandler } from './request-handler';
import { routes } from './routes';

const app = fastify({
  logger: {
    level: 'error',
  },
});

register(app);

routes.forEach(({ url, method, handler, schema }) => {
  app.route({
    method,
    url,
    handler,
    schema,
  });
});

app.get('*', {}, requestHandler);

app.listen({ port: 3000 }, () => {
  console.log('Server listening at http://localhost:3000');
});
