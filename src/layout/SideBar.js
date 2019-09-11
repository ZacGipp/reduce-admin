import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from "prop-types";
import {
  Layout, Menu, Icon,
} from 'antd';
import PageUtils from "../util/PageUtils";
import {catchEvent, dispatchCustomEvent, removeEvent} from "../util/ComUtils";
import Const from "../util/Const";

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
  },
};

@injectSheet(styles)
export default class SideBar extends React.Component {

  state = {
    collapsed: false,
    openKeys: [],
    defaultSelectedKey: '',
  };

  componentDidMount() {
    this.pathChange();
    catchEvent(Const.EVENT.SIDEBAR_PATH_CHANGE, this.pathChange);
  }

  componentWillUnmount() {
    removeEvent(Const.EVENT.SIDEBAR_PATH_CHANGE);
  }

  static refreshSelectedKeys() {
    dispatchCustomEvent(Const.EVENT.SIDEBAR_PATH_CHANGE);
  }

  pathChange = () => {
    const pathname = PageUtils.currentPath();
    this.setState({
      openKeys: [pathname.split('/').filter(k => k)[0]],
      selectedKeys: [pathname],
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onOpenChange = openKeys => {
    if (openKeys.length > 1) openKeys.shift();
    this.setState({openKeys});
  };

  onSelect = item => {
    const {onSelect} = this.props;
    onSelect ? onSelect() : PageUtils.linkTo(item.key);
  };

  render() {
    const {classes, data} = this.props;
    const {openKeys, collapsed, selectedKeys} = this.state;
    return (
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}>
          <div className={classes.logo} />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onSelect={this.onSelect}
              onOpenChange={this.onOpenChange}>
              {
                data.map(item => item.children ? <SubMenu
                  key={item.path}
                  title={<span>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                  </span>}>
                  {
                    item.children.map(sub => <Menu.Item key={sub.path}>
                      <span>{sub.name}</span>
                    </Menu.Item>)
                  }
                </SubMenu> : <Menu.Item key={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </Menu.Item>)
              }
            </Menu>
        </Sider>
    );
  }
}

SideBar.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func
};
SideBar.defaultProps = {
  data: () => console.log("not set prop data"),
};
