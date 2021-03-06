/**
 * Created by Zed on 2019/7/26.
 */
const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../config/webpack.prod');

const compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin());
compiler.run((err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    timings: false
  }) + '\n\n');
  if (err || stats.hasErrors()) {
    console.log(chalk.red('Webpack compilation failed！\n'));
  } else {
    console.log(chalk.green('Webpack compiled successfully！ See ./dist. \n'));
  }
});