/**
 * Created by Zed on 2019/7/26.
 */
const webpack = require('webpack');
const config = require("../config/webpack.dev");
const WebpackDevServer = require("webpack-dev-server");

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  host: 'wx.j-make.com.cn', // 可以使用手机访问
  historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
  inline: true,
  disableHostCheck: true,
  hot: true,
  // contentBase: path.resolve(__dirname, "../dist"),
  port: 3000,
  // proxy: {
  //   // 代理到后端的服务地址
  //   "/api": "http://localhost:3000"
  // },
  // progress: true, // 启动打包进度显示
  compress: true, // 启动压缩
  open: true,
});

server.listen(3000);