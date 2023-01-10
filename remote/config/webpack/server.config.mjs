import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default merge(common({ isServer: true }), {
  context: resolve(__dirname, '../../src'),
  entry: './index.ts',
  target: false,
  output: {
    path: resolve(__dirname, '../../dist/server'),
    filename: 'js/[name].js',
    libraryTarget: 'commonjs-module',
    publicPath: '/',
    clean: true,
  },
  externals: [nodeExternals()],
});
