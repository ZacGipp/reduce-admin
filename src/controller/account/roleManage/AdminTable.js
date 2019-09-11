/**
 * Created by Zed on 2019/8/21.
 */
import React from "react";
import {connect} from "react-redux";
import adminAction from "../../../redux/action/admin";
import Const from "../../../util/Const";
import BaseTablePage from "../../../component/common/BaseTablePage";
import {Button} from 'antd';
import EditPage from "./EditPage";

@connect((state, props) => {
    return {
      userPage: state.admin.userPage,
    };
  },
  {
    getUserPage: adminAction.getUserPage,
  })
export default class AdminTable extends BaseTablePage {

  tableAction = data => this.props.getUserPage(data);
  tableData = () => this.props.userPage;

  state = {
    columns: [
      {
        columnKey: 'loginName',
        label: '登录名',
        minWidth: 140,
        sortable: true
      },
      {columnKey: 'userName', label: '昵称', minWidth: 140, sortable: true},
      {
        columnKey: 'type',
        label: '账户类型',
        formatter: r => {
          const res = Const.ROLE.LIST.find(i => i.value === r.type);
          return res ? res.label : '';
        }
      },
      {
        columnKey: 'superFlag',
        label: '超级管理',
        minWidth: 140,
        formatter: r => {
          if (r.superFlag === 1) return '是';
          return '否';
        }
      },
      {
        columnKey: 'lastLoginTime',
        label: '最近登录日期',
        minWidth: 170,
        sortable: true
      },
      {
        columnKey: 'updateTime',
        label: '更新日期',
        minWidth: 170,
        sortable: true
      },
      {columnKey: 'updateName', label: '更新者'},
      {columnKey: 'createName', label: '创建者', inDetail: true},
      {
        columnKey: 'createTime',
        label: '创建日期',
        minWidth: 170,
        sortable: true,
        inDetail: true
      }
    ],
    tableSearchColumns: [
      {column: 'logName', label: '请输入登录名', type: 'input'},
      {column: 'userName', label: '请输入昵称', type: 'input'},
      {
        column: 'type',
        label: '请选择账户类型',
        type: 'option',
        options: Const.ROLE.LIST,
      }
    ],
    tableActionSearchColumn: '',
  };

  componentDidMount() {
    const {uuid = ''} = this.formData;
    this.state.tableActionSearchColumn = [{roleUuid: uuid}];
  }

}

