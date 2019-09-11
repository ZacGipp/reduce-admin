/**
 * Created by Zed on 2019/7/23.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common');
// const webpack = require("webpack");

module.exports = merge(common, {
  mode: 'development',
  // entry: ["react-hot-loader/patch"],
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // 开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
    // new webpack.HotModuleReplacementPlugin()
  ],
});