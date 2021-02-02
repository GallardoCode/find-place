const path = require('path');
const dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    publicPath: '/dist/'
  },
  plugins: [
    new dotenv(),
    new ESLintPlugin({extensions:['ts','tsx']})
  ]
};