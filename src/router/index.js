/**
 * Created by Zed on 2019/8/6.
 */
import React from 'react';
import lazyLoad from "../Loadable/lazyLoad";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Path from './path';
import Layout from '../layout';
import Login from "../controller/login/LoginPage";
import NotFound from "../controller/exception/NotFound";
import _ from 'lodash';
import HomePage from "../controller/Home/HomePage";

export default function appRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path={Path.LOGIN} name="登录" component={() => lazyLoad(Login)} />
        <Route path={Path.ROOT} name="根布局" component={Layout} />
      </Switch>
    </Router>
  );
}

export function menuRoutes(menuMap) {
  let routes = [];
  menuMap.map(route => {
    if (route.hasOwnProperty('children'))
      routes = routes.concat(route.children);
    else routes.push(route);
  });
  return <Switch>
    <Route path={Path.HOME} name="首页" component={() => lazyLoad(HomePage)} />
    {
      routes.map((route, key) => {
        const {path, component, name, redirect, pathTo} = route;
        if (redirect)
          return <Redirect exact from={path} to={pathTo} name={name} key={key} />;
        else
          return <Route exact path={path} name={name} component={() => lazyLoad(component)} key={key} />;
      })
    }
    <Redirect exact from={Path.ROOT} to={Path.HOME} name="默认首页跳转" />
    <Route name="404" component={() => lazyLoad(NotFound)} />
  </Switch>;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param urls
 * @param PPath
 */
export function filterAsyncRouter(asyncRouterMap, urls, PPath = "") {
  return asyncRouterMap.filter(route => {
    if (route.children && route.children.length) {
      // route.children = filterAsyncRouter(route.children, urls, PPath.split("/").filter(p => p).concat(route.path.split("/").filter(p => p)).join("/"));
      route.children = filterAsyncRouter(route.children, urls, route.path.split("/").filter(p => p).join("/"));
      return route.children.length;
    } else {
      return hasPermission(urls, route, PPath);
    }
  });
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param urls
 * @param route
 * @param PPath
 */
function hasPermission(urls, route, PPath = "") {
  if (!_.isEmpty(urls))
    return Object.keys(urls).some(k => {
      // const routPath = PPath.split("/").filter(p => p).concat(route.path.split("/").filter(p => p)).join("/");
      const routPath = route.path.split("/").filter(p => p).join("/");
      const urlPath = k.split("/").filter(p => p).join("/");
      // console.log(routPath, urlPath);
      return routPath === urlPath;
    });

  return true;
}
