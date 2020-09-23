const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
require('dotenv').config();

module.exports = (env, argv) => {
  return {
    mode: argv.mode === 'production' ? 'production' : 'development',
    entry: {
      main: './src/index.jsx',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [new HardSourceWebpackPlugin()],
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css'],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
    },
    module: {
      rules: [
        {
          // html
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          // css
          test: /\.css$/,
          use: [
            { loader: 'style-loader', options: { injectType: 'linkTag' } },
            {
              loader: 'file-loader',
              options: {
                outputPath: 'styles',
              },
            },
            'css-loader',
          ],
          exclude: /node_modules/,
        },
        {
          // js
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          // img
          test: /\.(jpg|JPG|jpeg|png|PING|gif|mp3|svg|ttf|woff2|woff|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
              publicPath: (path) => '/img/' + path,
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        process: {
          env: {
            isProd: argv.mode === 'production',
          },
        },
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
    ],
  };
};
