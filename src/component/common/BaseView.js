/**
 * Created by Zed on 2019/8/21.
 */
import React from 'react';
import PageUtils from "../../util/PageUtils";
import lazyLoad from "../../Loadable/lazyLoad";
import SubPageRouter from "../../router/SubPageRouter";
import {Spin} from "antd";

export default class BaseView extends React.Component {

  initialPages = [];

  state = {
    subPageRouter: null,
    currentPage: '',
    loading: false,
  };

  componentWillMount() {
    const firstPage = this.initialPages.length ? Object.values(this.initialPages[0])[0] : null;
    this.setState({
      currentPage: {page: firstPage, props: {}},
      subPageRouter: new SubPageRouter(this, this.initialPages),
    });
  }

  render() {
    const {currentPage: {page, props}, subPageRouter, loading} = this.state;
    return <Spin spinning={loading}>
      {
        page ? lazyLoad(page, {subPageRouter, ...props, setPageLoading: bool => this.setState({loading: bool})}) : '未找到页面'
      }
    </Spin>;
  }

  /**
   * 适配当前渲染页面
   * @return {*}
   */
  switchPage = () => {
    if (this.initialPages.length <= 0) return '未配置页面';
    const subPage = this.initialPages.find(page => {
      const key = Object.keys(page)[0];
      return PageUtils.hashEqual(key);
    });

    const component = subPage ? Object.values(subPage)[0] : Object.values(this.initialPages[0])[0];

    return lazyLoad(component, {subPageRouter: this.subPageRouter});
  }
}
