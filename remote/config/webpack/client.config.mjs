import moduleFederation from '@module-federation/node';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import packageJson from '../../package.json' assert { type: 'json' };

import { common } from './common.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV !== 'production';
const PORT = 3001;

const { dependencies } = packageJson;
const { UniversalFederationPlugin } = moduleFederation;

export default merge(common(), {
  context: resolve(__dirname, '../../src'),
  entry: './index.ts',
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    allowedHosts: 'all',
    static: {
      directory: resolve(__dirname, '../../dist'),
    },
    historyApiFallback: true,
    compress: false,
    port: PORT,
    client: {
      webSocketURL: `ws://localhost:${PORT}/ws`,
    },
  },
  output: {
    path: resolve(__dirname, '../../dist/client'),
    filename: isDevelopment ? 'js/[name].js' : 'js/[name].[contenthash].js',
    chunkFilename: isDevelopment
      ? 'js/[name].js'
      : 'js/[name].[contenthash].js',
    publicPath: `http://localhost:${PORT}/`,
    assetModuleFilename: isDevelopment
      ? 'assets/[name].[ext]'
      : 'assets/[name].[contenthash].[ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.ejs',
    }),
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
        name: 'remote',
        filename: 'remoteEntry.js',
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
