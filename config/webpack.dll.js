/*
* @desc 静态公共资源打包配置
*/

const path = require('path');
const webpack = require('webpack');
const config = require('./project.config');

module.exports = {
  mode: 'production',
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: config.vendor,
  },
  output: {
    path: config.dllDir,
    filename: '[name].[hash:4].dll.js',
    library: '[name]_[hash]',
    libraryTarget: 'this'
  },
  plugins: [
    new webpack.DllPlugin({
      // 定义程序中打包公共文件的入口文件vendor.js
      context: config.rootDir,

      // manifest.json文件的输出位置
      path: path.resolve(config.dllDir, '[name]-manifest.json'),

      // 定义打包的公共vendor文件对外暴露的函数名
      name: '[name]_[hash]'
    })
  ]
};