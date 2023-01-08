import fastify from 'fastify';

import { register } from './register';
import { requestHandler } from './request-handler';

const app = fastify({
  logger: {
    level: 'error',
  },
});

register(app);

app.get('*', {}, requestHandler);

app.listen({ port: 3000 }, () => {
  console.log('Server listening at http://localhost:3000');
});
