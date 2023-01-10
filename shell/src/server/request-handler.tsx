import i18next from 'i18next';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import serialize from 'serialize-javascript';

import { i18nextOptions, getResources } from 'src/i18n';
import shellLocales from 'src/locales';
import { App } from 'src/shared/App';

import type { RouteHandlerMethod } from 'fastify';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';

i18next.use(initReactI18next);

export const requestHandler: RouteHandlerMethod = (req, res) => {
  (async () => {
    const { default: remoteLocales } = await import('remote/locales').catch(
      () => ({
        default: {},
      })
    );
    const lng = req.session.get<string>('lng') || 'en';
    await i18next.init({
      ...i18nextOptions,
      lng,
      resources: getResources(shellLocales, remoteLocales),
    });
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
  })();
};
