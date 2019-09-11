/**
 * Created by Zed on 2019/7/30.
 */
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ESLintFormatter = require('eslint-friendly-formatter');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  // bundle
  new HappyPack({
    //用id来标识 happypack处理那里类文件
    id: 'happyBundle',
    //如何处理  用法和loader 的配置一样
    loaders: [
      'bundle-loader?lazy',
      'babel-loader?cacheDirectory=true',
    ],
    //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  }),
  // babel
  new HappyPack({
    //用id来标识 happypack处理那里类文件
    id: 'happyBabel',
    //如何处理  用法和loader 的配置一样
    loaders: [{
      loader: 'babel-loader?cacheDirectory=true',
    }],
    //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  }),
  // eslint
  new HappyPack({
    //用id来标识 happypack处理那里类文件
    id: 'happyEslint',
    //如何处理  用法和loader 的配置一样
    loaders: [{
      loader: 'eslint-loader',
      options: {
        cacheDirectory: true,
        formatter: ESLintFormatter
      }
    }],
    //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  }),
  // style
  new HappyPack({
    //用id来标识 happypack处理那里类文件
    id: 'happyStyle',
    //如何处理  用法和loader 的配置一样
    loaders: [
      // 'style-loader', // 创建style标签，并将css添加进去
      // MiniCssExtractPlugin.loader,
      'css-loader', // 编译css
      "postcss-loader", // 自动增加前缀
      'sass-loader' // 编译scss
    ],
    //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  }),
];