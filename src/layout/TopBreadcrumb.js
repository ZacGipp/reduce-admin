/**
 * Created by Zed on 2019/8/9.
 */
import React from 'react';
import {Breadcrumb} from "antd";
import PropTypes from "prop-types";
import PageUtils from "../util/PageUtils";
import {Link} from "react-router-dom";
import Path from "../router/path";

export default class TopBreadcrumb extends React.Component {

  render() {
    return <Breadcrumb style={{ margin: '.2rem 0' }}>
      <Breadcrumb.Item>
        <Link to={Path.HOME} onClick={this.props.onClick}>首页</Link>
      </Breadcrumb.Item>
      {
        this.getBreadcrumbs()
      }
    </Breadcrumb>;
  }

  getBreadcrumbs = () => {
    let breadcrumbs = [];
    const {data} = this.props;
    const pathname = PageUtils.currentPath();
    const menuItem = data.find(d => pathname.indexOf(d.path) > -1);
    if (menuItem) breadcrumbs.push(menuItem);
    if (menuItem && menuItem.hasOwnProperty('children')) {
      const subMenuItem = menuItem.children.find(d => PageUtils.pathEqual(d.path));
      if (subMenuItem) breadcrumbs.push(subMenuItem);
    }
    return breadcrumbs.map((k, i) => <Breadcrumb.Item key={i} onClick={this.props.onClick}>
      {k.name}
    </Breadcrumb.Item>);
  }
}

TopBreadcrumb.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
};
TopBreadcrumb.defaultProps = {
  data: () => console.log("not set prop data"),
  onClick: () => console.log("not set prop onClick"),
};

