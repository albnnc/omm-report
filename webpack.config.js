const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const solution = require('./src/calc/solution')();
const characteristics = require('./src/calc/characteristics')();

const absolutize = v => path.join(__dirname, v);
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: absolutize('src/demo/index.js'),
  resolve: {
    extensions: ['.js']
  },

  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'cheap-eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: absolutize('src/demo/index.html')
    }),
    new webpack.DefinePlugin({
      SOLUTION: JSON.stringify(solution),
      CHARACTERISTICS: JSON.stringify(characteristics)
    })
  ],

  output: {
    filename: 'bundle.js',
    path: absolutize('docs')
  }
};
