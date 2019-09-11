import React from 'react';
import Bundle from './Bundle';
import DefaultPage from "./DefaultPage";

/*
* 包装方法，第一次调用后会返回一个组件（函数式组件）
* 由于要将其作为路由下的组件，所以需要将 props 传入
*/
const lazyLoad = (loadComponent, props) => {
  // Bundle包含的是一个函数子组件 由Bundle.js里的this.props.children(this.state.mod)渲染
  return (
    <Bundle load={loadComponent}>
      {Comp => (Comp ? <Comp {...props} /> : <DefaultPage/>)}
    </Bundle>
  );
};

export default lazyLoad;
