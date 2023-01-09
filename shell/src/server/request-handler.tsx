import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import serialize from 'serialize-javascript';

import i18nextOptions from 'src/i18n';
import { App } from 'src/shared/App';

import type { RouteHandlerMethod } from 'fastify';
import type { InitOptions } from 'i18next';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';

i18next.use(Backend);
i18next.use(initReactI18next);

export const requestHandler: RouteHandlerMethod = (req, res) => {
  const lng = 'ru';
  i18next.init({ ...i18nextOptions(true), lng } as InitOptions).then(() => {
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
            <I18nextProvider i18n={i18next}>
              <App />
            </I18nextProvider>
          </div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.initialLanguage = ${serialize(lng)};
                window.initialI18nStore = ${serialize(i18next.store.data)}
              `,
            }}
          />
        </body>
      </html>,
      options
    );
  });
};
