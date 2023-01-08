import { renderToPipeableStream } from 'react-dom/server';

import { App } from 'src/shared/App';

import type { RouteHandlerMethod } from 'fastify';
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
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/public/favicon.ico"
        />
        <title>Isomof</title>
      </head>
      <body>
        <div id="root">
          <App />
        </div>
      </body>
    </html>,
    options
  );
};
