/**
 * Created by Zed on 2019/9/2.
 */
import React from 'react';
import PropTypes from "prop-types";

export default class BasePage extends React.Component {

  constructor(props) {
    super(props);
    this.stateFun = state => this.setState(state);
    this.handelPageExtraPageData();
  }

  /**
   *  处理从上个页面带过来的数据
   *  formData 与 其他data值分开处理
   */
  handelPageExtraPageData() {
    const { formData, defaultData } = this.props.extraData || {};
    if (formData) this.formData = Object.assign({}, this.formData, formData);

    // 除formData外其他需要初始化data值
    if (defaultData) {
      Object.keys(defaultData).map(key => {
        this[key] = defaultData[key];
      });
    }
  }

  /**
   * 处理上个页面修改本页面返回后的数据
   */
  handelGhostPageData = () => {
    if (this.props.ghostPageData) {
      Object.keys(this.props.ghostPageData).map(key => {
        this.state[key] = this.props.ghostPageData[key];
      });
    }
  };

  /**
   * 前往下一个页面
   * @param pageName 页面hash值
   * @param extraData 页面search对象
   */
  goPage = (pageName, extraData) => {
    this.props.subPageRouter.goPage(pageName, this.state, extraData);
  };

  pageBack = (extraData) => {
    const ghostPageData = this.props.leftPageData; // 上个页面传过来的数据，修改后返回回去
    this.props.subPageRouter.pageBack(
      ghostPageData,
      extraData
    );
  };

  pageCanBack = () => {
    return this.props.subPageRouter.pageCanBack();
  };

  setLoading = bool => this.props.setPageLoading(bool);

}

BasePage.propTypes = {
  ghostPageData: PropTypes.any, // 存储页面状态数据
  leftPageData: PropTypes.object, // 上个页面的状态数据
  extraData: PropTypes.object, // 上个页面传过来的参数
  setPageLoading: PropTypes.func, // 设置loading
};

BasePage.defaultProps = {};
