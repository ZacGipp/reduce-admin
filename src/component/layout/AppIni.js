/**
 * Created by Zed on 2019/8/6.
 */
import React from 'react';
import appAction from "../../redux/action/app";
import {connect} from "react-redux";
import {dispatchCustomEvent, removeAppLoading} from "../../util/ComUtils";
import Const from "../../util/Const";
import PageUtils from "../../util/PageUtils";

@connect(
  state => ({}),
  {
    setAppLoaded: appAction.setAppLoaded,
    getUserInfo: appAction.getUserInfo,
  }
)
export default class AppIni extends React.Component {

  componentDidMount() {
    this.init();
  }

  async init() {
    if (Const.DO_NOT_GET_USER_INFO_WITH_LIST.indexOf(PageUtils.currentPath()) === -1) {
      // 获取用户信息
      await this.props.getUserInfo();
    }
    this.props.setAppLoaded(true);

    removeAppLoading();
    window.onhashchange = this.handelHashChange;
  }

  render() {
    return '';
  }

  /**
   * 监听hash改变，并发出
   */
  handelHashChange = () => {
    dispatchCustomEvent(Const.EVENT.EVENT_WINDOW_HASH_CHANGE);
  };

}
