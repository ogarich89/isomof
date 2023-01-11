import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default merge(common({ isServer: true }), {
  context: resolve(__dirname, '../../src/server'),
  entry: './index.ts',
  target: false,
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    splitChunks: false,
  },
  output: {
    path: resolve(__dirname, '../../dist/server'),
    filename: 'index.js',
    libraryTarget: 'commonjs-module',
  },
  externals: [nodeExternals()],
});
