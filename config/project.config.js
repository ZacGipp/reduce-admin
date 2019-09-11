/**
 * Created by Zed on 2019/7/26.
 */
const path = require('path');

module.exports = {
  env: {
    devEnv: require('./project.config.dev'),
    prodEnv: require('./project.config.prod'),
  },
  rootDir: path.resolve(__dirname, '../'),
  srcDir: path.resolve(__dirname, '../src'),
  outputDir: path.resolve(__dirname, '../dist'),
  dllDir: path.resolve(__dirname, '../dll'),
  nodeModulesDir: path.resolve(__dirname, '../node_modules'),
  bundleDir: path.resolve(__dirname, '../src/controller'),
  publicDir: path.resolve(__dirname, '../public'),
  vendor: [
    'react', 'react-dom', 'lodash',
    "antd", "axios", "core-js", "history",
    "js-cookie", "md5", "moment",
    "prop-types", "react-jss", "react-particles-js",
    "react-redux", "react-router-dom",
    "react-router-redux", "redux",
    "redux-actions", "redux-logger",
    "redux-promise", "redux-thunk",
  ]
};