import moduleFederation from '@module-federation/node';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import packageJson from '../../package.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV !== 'production';
const { UniversalFederationPlugin } = moduleFederation;
const { dependencies } = packageJson;

const common = ({ isServer } = {}) => ({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: resolve(__dirname, '../../src'),
    },
  },
  devtool: isDevelopment ? 'cheap-module-source-map' : false,
  stats: {
    assets: true,
    modules: false,
    hash: false,
    children: false,
    warnings: true,
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          sourceMap: isDevelopment,
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          ...(!isServer ? [MiniCssExtractPlugin.loader] : []),
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              modules: {
                auto: (resourcePath) => !resourcePath.endsWith('.css'),
                localIdentName: isDevelopment
                  ? '[local]_[hash:base64:5]'
                  : '[hash:base64:5]',
                exportOnlyLocals: isServer,
                exportLocalsConvention: 'camelCaseOnly',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        issuer: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              emitFile: !isServer,
              name: isDevelopment ? '[name].[ext]' : '[name].[hash:8].[ext]',
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new UniversalFederationPlugin(
      {
        name: 'remote',
        filename: 'remoteEntry.js',
        isServer: isServer,
        ...(isServer
          ? { library: { type: 'commonjs-module' }, remotes: {} }
          : {}),
        exposes: {
          './Remote': './components/Remote',
          './locales': './locales',
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
          i18next: {
            singleton: true,
            requiredVersion: dependencies.i18next,
          },
          'react-i18next': {
            singleton: true,
            requiredVersion: dependencies['react-i18next'],
          },
        },
      },
      null
    ),
  ],
});

export { common };
