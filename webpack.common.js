require('@babel/register');

const path = require('path');

const src = path.resolve(__dirname, 'src');
const public = path.resolve(__dirname, 'public');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: src + '/index.tsx',
  output: {
    path: public,
    publicPath: '/',
    filename: 'bundle.js',
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
        exclude: {
          include: /node_modules/,
        },
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
      {
        // js
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        // tsx
        test: /\.tsx?$/,
        use: 'ts-loader',
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
            publicPath: path => '/img/' + path,
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: src + '/index.html' })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};
