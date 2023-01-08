import moduleFederation from '@module-federation/node';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import packageJson from '../../package.json' assert { type: 'json' };

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV !== 'production';
const { UniversalFederationPlugin } = moduleFederation;

const { dependencies } = packageJson;

export default merge(common(), {
  context: resolve(__dirname, '../../src/client'),
  entry: './index.ts',
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: isDevelopment ? 'js/[name].js' : 'js/[name].[contenthash].js',
    chunkFilename: isDevelopment
      ? 'js/[name].js'
      : 'js/[name].[contenthash].js',
    publicPath: '/dist/',
    assetModuleFilename: isDevelopment
      ? 'assets/[name].[ext]'
      : 'assets/[name].[contenthash].[ext]',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? 'css/[name].css'
        : 'css/[name].[contenthash].css',
      chunkFilename: isDevelopment
        ? 'css/[name].css'
        : 'css/[name].[contenthash].css',
    }),
    new UniversalFederationPlugin(
      {
        remotes: {
          remote: 'remote@http://localhost:3001/client/remoteEntry.js',
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
