/**
 * Created by Zed on 2019/7/23.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const config = require('./project.config');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin'); // 引入 PWA 插件

module.exports = merge(common, {
  mode: 'production',
  devtool: "cheap-module-source-map",
  // devtool: false,
  optimization: {
    usedExports: true, // js Tree Shaking 只支持import方式引入
    splitChunks: {
      chunks: "all", // 所有的chunks代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        // 公共代码打包分组配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    }
  },
  plugins: [
    // css Tree Shaking
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(config.publicDir, '*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(config.srcDir, '*.js')
      ])
    }),
    // 拷贝dll到dist目录
    new CopyWebpackPlugin([{
      from: config.dllDir,
      to: path.resolve(config.outputDir, 'dll')
    }]),
    // PWA配置，生产环境才需要
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
  ]
});