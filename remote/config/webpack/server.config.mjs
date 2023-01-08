import moduleFederation from '@module-federation/node';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-restricted-imports
import packageJson from '../../package.json' assert { type: 'json' };

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const { dependencies } = packageJson;
const { UniversalFederationPlugin } = moduleFederation;

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
  plugins: [
    new UniversalFederationPlugin(
      {
        isServer: true,
        name: 'remote',
        filename: 'remoteEntry.js',
        library: { type: 'commonjs-module' },
        remotes: {},
        exposes: {
          './Remote': './components/Remote',
        },
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
        },
      },
      null
    ),
  ],
});
