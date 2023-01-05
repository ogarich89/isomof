import moduleFederation from '@module-federation/node';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { UniversalFederationPlugin } = moduleFederation;

export default merge(common({ isServer: true }), {
  context: resolve(__dirname, '../../src/server'),
  entry: './request-handler.tsx',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  optimization: {
    splitChunks: false,
  },
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: 'request-handler.cjs',
    libraryTarget: 'commonjs-static',
    publicPath: '/',
  },
  externals: [nodeExternals()],
  plugins: [
    new UniversalFederationPlugin(
      {
        isServer: true,
        remotes: {
          remote: 'remote@http://localhost:3001/server/remoteEntry.js',
        },
      },
      null
    ),
  ],
});
