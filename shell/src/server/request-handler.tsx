import { renderToPipeableStream } from 'react-dom/server';

import { App } from 'src/shared/App';

import type { RouteHandlerMethod, FastifyReply } from 'fastify';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';

export const requestHandler: RouteHandlerMethod = (req, res) => {
  const options: RenderToPipeableStreamOptions = {
    onAllReady() {
      res.statusCode = 200;
      res.header('Content-type', 'text/html');
      stream.pipe(res.raw);
    },
    bootstrapScripts: ['/dist/js/main.js'],
  };

  const stream = renderToPipeableStream(
    <div id="root">
      <App />
    </div>,
    options
  );
};
