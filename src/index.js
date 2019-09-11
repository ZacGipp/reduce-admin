/**
 * Created by Zed on 2019/7/23.
 */
import React from 'react';
import { render } from 'react-dom';
import './assets/style/style.scss';
import configStore from "./util/configStore";
import {Provider} from 'react-redux';
import {JssProvider} from 'react-jss';
import App from "./layout/App";

const store = configStore();

render(
  <JssProvider classNamePrefix="Jss-">
    <Provider store={store}>
      <App />
    </Provider>
  </JssProvider>,
  document.getElementById('root'));

// 判断该浏览器支不支持 serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('service-worker registed');
      })
      .catch(error => {
        console.log('service-worker registed error');
      });
  });
}
