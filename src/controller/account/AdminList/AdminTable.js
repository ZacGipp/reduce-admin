/**
 * Created by Zed on 2019/8/6.
 */
import React from "react";
import BaseTablePage from "../../../component/common/BaseTablePage";
import {Button} from "antd";
import Const from "../../../util/Const";
import {connect} from "react-redux";
import accountAction from "../../../redux/action/account";

@connect((state, props) => {
    return {
      rolePage: state.account.rolePage,
    };
  },
  {
    getRolePage: accountAction.getRolePage
  })
export default class AdminTable extends BaseTablePage {

  tableAction = data => this.props.getRolePage(data);
  tableData = () => this.props.rolePage;
  tableCanSelect = true;
  showDetail = false;

  state = {
    columns: [
      {columnKey: 'id', label: 'id', minWidth: 60, sortable: true},
      {columnKey: 'roleName', label: '角色名称', minWidth: 60, sortable: true},
      {columnKey: 'description', label: '描述', minWidth: 60},
      {columnKey: 'userCount', label: '账号数', minWidth: 60, sortable: true},
      {columnKey: 'createName', label: '创建者', minWidth: 60, inDetail: true},
      {columnKey: 'createTime', label: '创建日期', minWidth: 120, inDetail: true},
      {
        label: Const.TABLE_BTN_TITLE, buttons: [
          {label: '编辑', type: 'edit'},
          {label: '删除', type: 'del', confirmable: true},
          {label: '授权', type: 'auth'},
          {label: '管理员列表', type: 'admin'}
        ]
      }
    ],
    tableSearchColumns: [
      {column: 'roleName', label: '请输入角色名称', type: 'input', value: ''}
    ],
  };

  topButtonHtml = () => {
    return <div className="table_searchContainer">
      <Button
        className="table_searchItem"
        type="primary"
        onClick={e => {
          e.preventDefault();
          this.goPage('EditPage');
        }}>添加</Button>

    </div>;
  }
}
