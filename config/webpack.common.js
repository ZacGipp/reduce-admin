/**
 * Created by Zed on 2019/6/4.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {
  srcDir, outputDir, dllDir, bundleDir, nodeModulesDir, publicDir, env
} = require('./project.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const happyPackConfig = require('./happyPackConfig');

const envConfig = env[process.env.NODE_ENV + 'Env'];

module.exports = {
  entry: [path.resolve(srcDir, 'index.js')],
  output: {
    path: outputDir,
    filename: 'js/[name].[hash:4].js',
    chunkFilename: "bundle/[name].bundle.[chunkhash:4].js",
    publicPath: "/",
    // publicPatch: '//【cdn】.com', //指定存放JS文件的CDN地址
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: 'happypack/loader?id=happyBundle',
        include: bundleDir,
      },
      {
        test: /(\.jsx|\.js)$/,
        use: 'happypack/loader?id=happyBabel',
        include: srcDir,
        exclude: [
          nodeModulesDir,
          bundleDir,
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        use: 'happypack/loader?id=happyEslint',
        enforce: 'pre',
        include: srcDir,
        exclude: nodeModulesDir,
      },
      {
        test: /\.(c|sc|sa)ss$/,
        // use: 'happypack/loader?id=happyStyle',
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=happyStyle'
        ]
      },
      {
        test: /\.(png|PNG|jpe?g|JPG|gif|GIF)(\?.*)?$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[path][name].[hash:5].[ext]'
            }
          }],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[path][name].[hash:5].[ext]'
          }
        }],
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[path][name].[hash:5].[ext]',
            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
          }
        }],
      }
    ]
  },
  plugins: [
    ...happyPackConfig,
    // 清空dist文件夹
    new CleanWebpackPlugin(),
    // 处理html模板
    new HtmlWebpackPlugin({
      template: path.resolve(publicDir, 'index.html'),
      favicon: path.resolve(publicDir, 'favicon.ico'),
      minify: {
        collapseWhitespace: true, //移除空格
        // removeAttributeQuotes:true //移除属性的双引号
      },
      hash: true
    }),
    // 抽取 css 文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:4].css",
      chunkFilename: "css/[id].[hash:4].css"
    }),
    // 暴露全局变量
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env': envConfig
    }),
    // 将打包后的 dll.js 文件注入到我们生成的 index.html 中
    new IncludeAssetsPlugin({
      assets: [{
        path: './dll',
        glob: '*.js',
        globPath: dllDir
      }],
      append: false
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(dllDir, 'vendor-manifest.json')
    })
  ]
};