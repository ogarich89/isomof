import moduleFederation from '@module-federation/node';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import packageJson from '../../package.json' assert { type: 'json' };

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { UniversalFederationPlugin } = moduleFederation;
const { dependencies } = packageJson;

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
    path: resolve(__dirname, '../../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs-module',
  },
  externals: [nodeExternals()],
  plugins: [
    new UniversalFederationPlugin(
      {
        isServer: true,
        remotes: {
          remote: 'remote@http://localhost:3001/server/remoteEntry.js',
        },
        shared: {
          react: {
            requiredVersion: dependencies.react,
          },
          'react-dom': {
            requiredVersion: dependencies['react-dom'],
          },
        },
      },
      null
    ),
  ],
});
