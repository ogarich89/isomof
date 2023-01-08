import gulpNodemon from 'gulp-nodemon';
import webpack from 'webpack';

import webpackClientConfig from './config/webpack/client.config.mjs';
import webpackServerConfig from './config/webpack/server.config.mjs';

const clientCompiler = webpack(webpackClientConfig);
const serverCompiler = webpack(webpackServerConfig);

export const nodemon = async () => {
  const stream = gulpNodemon({
    script: 'server/index.mjs',
    watch: ['server/**/*.*', 'dist/request-handler.cjs'],
    exec: 'node --inspect',
  });
  stream.on('crash', () => stream.emit('restart', 300));
};

export const server = () => {
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err);
    }
    console.log(
      stats.toString({
        modules: false,
        colors: true,
      })
    );
  });
  return new Promise((resolve) => {
    serverCompiler.hooks.done.tap('server', resolve);
  });
};

export const client = () => {
  clientCompiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err);
    }
    console.log(
      stats.toString({
        modules: false,
        colors: true,
      })
    );
  });
  return new Promise((resolve) => {
    clientCompiler.hooks.done.tap('client', resolve);
  });
};

export const development = async () => {
  await client();
  await server();
  await nodemon();
};
