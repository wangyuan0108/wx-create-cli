/*
 * @Author: wangyuan
 * @Date: 2020-10-09 17:12:58
 * @LastEditTime: 2020-10-23 16:02:08
 * @LastEditors: wangyuan
 * @Description:
 */
const webpack = require('webpack') //访问内置的插件
const path = require('path')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = {
  entry: './bin/index.js',
  output: {
    filename: 'bin.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: 'node-loader',
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false,
        },
      }),
    ],
  },
}

module.exports = config
