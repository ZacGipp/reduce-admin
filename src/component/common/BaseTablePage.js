import React from 'react';
import CustomTable from "../table/CustomTable";
import TableTopSearch from "./TableTopSearch";
import _ from 'lodash';
import {Button} from "antd";
import PropTypes from "prop-types";
import BasePage from "./BasePage";
import CommonMsg from "../layout/CommonMsg";

export default class BaseTablePage extends BasePage {

  tableAction = ''; // 获取列表action
  tableData = ''; // 列表store
  tableCanSelect = false; // 是否可选择表格项
  pagination = true; // 是否分页
  showDetail = true; // 展示表格更多详情
  deleteFun = ''; // 删除接口action

  state = {
    selectItems: [], // 表格选中项
    tableLoading: false, // 表格加载中
    tableSearchParams: {}, // 调用table接口时传参
    columns: [], // 列表显示规则
    tableSearchColumns: [], // 搜索规则
    tableActionSearchColumn: [], // 接口必传参数
    tempSearchColumn: [], // search参数容器
    tempTableColumn: [], // table参数容器
    defaultSortOrder: {}, // 表格默认排序项
  };

  componentWillMount() {
    this.handelGhostPageData();
  }

  render() {
    return (
      <div>
        {
          this.pageCanBack() && this.pageBackHtml()
        }
        {
          this.topButtonHtml()
        }
        {
          this.tableTopSearchHtml()
        }
        {
          this.tableHtml()
        }
      </div>
    );
  }

  init = () => {
    this.tableAction && this.refreshTableWithParams();
  };

  /**
   * 顶部按钮
   * @return {string}
   */
  topButtonHtml = () => {
    return '';
  };

  /**
   * 编辑按钮基础写法
   * @param row
   */
  handelEdit = row => {
    this.goPage('EditPage', {formData: row});
  };

  /**
   * 删除按钮基础写法
   * @param row
   */
  handelDel = row => {
    this.submitDel(row);
  };

  submitDel = (params) => {
    if (this.deleteFun) {
      this.setLoading(true);
      this.deleteFun(params).then(res => {
        CommonMsg.success('操作成功！');
        this.refreshTable();
      }).finally(() => this.setLoading(false));
    } else CommonMsg.error('未设置删除action');
  };

  /**
   * 返回按钮
   * @return {*}
   */
  pageBackHtml = () => {
    return <Button
      className="table_searchItem"
      type="primary"
      onClick={e => {
        e.preventDefault();
        this.pageBack();
      }}>返回</Button>;
  };

  /**
   * 搜索组件
   * @return {*}
   */
  tableTopSearchHtml = () => {
    const {tableSearchParams} = this.props.ghostPageData || {};
    return <TableTopSearch defaultSearchData={tableSearchParams} columns={this.state.tableSearchColumns} initSearch={params => {
      this.state.tempSearchColumn = params;
      this.init();
    }} handelSearch={this.handelTableSearch}/>;
  };

  /**
   * 监听搜索组件参数变化
   * @param params
   */
  handelTableSearch = (params) => {
    this.state.tempSearchColumn = params;
    this.refreshTableWithParams();
  };

  // 表格组件
  tableHtml = () => {
    const {columns, tableLoading, defaultSortOrder} = this.state;
    return <CustomTable
      showDetail={this.showDetail}
      pagination={this.pagination}
      tableCanSelect={this.tableCanSelect}
      data={this.tableData}
      columns={columns}
      loading={tableLoading}
      handelTableButtonsEvent={this.handelTableButtonsEvent}
      handleSelectionChange={this.handleSelectionChange}
      handelTableChange={this.handelTableChange}
      defaultSortOrder={defaultSortOrder}
    />;
  };

  /**
   * 监听表格分页、筛选、排序等变化
   * @param pagination
   * @param filters
   * @param sorter
   */
  handelTableChange = (pagination, filters, sorter) => {
    // console.log(pagination, filters, sorter);
    const {current, pageSize} = pagination;
    const {columnKey, order} = sorter;
    let params = [
      {currentPage: current},
      {pageSize},
    ];
    if (columnKey && order) {
      params.push({sort: columnKey});
      params.push({direction: order === 'ascend' ? 'asc' : 'desc'});
    }
    this.state.tempTableColumn = params;
    this.refreshTableWithParams();
  };

  /**
   * 选择表格项监听
   * @param selectedRows
   * @param selectedRowKeys
   */
  handleSelectionChange = (selectedRows, selectedRowKeys) => {
    this.setState({selectItems: selectedRows});
  };

  /**
   * 表格操作按钮点击注册
   * @param eventType
   * @param row
   */
  handelTableButtonsEvent = (eventType, row) => {
    const funcName = "handel" + eventType.replace(/^\S/, s => s.toUpperCase());
    const handelTableTopButtonTypeEvent = this[funcName];
    if (handelTableTopButtonTypeEvent) handelTableTopButtonTypeEvent.apply(this, [row]);
  };

  /**
   * 刷新table
   */
  refreshTable = () => {
    this.refreshTableWithParams({
      currentPage: 1,
      pageSize: 10,
    });
  };

  /**
   * 刷新table
   * @param params
   */
  refreshTableWithParams = (params = {}) => {
    const {tempSearchColumn = [], tempTableColumn = [], tableActionSearchColumn = []} = this.state;
    let _params = {};
    tempSearchColumn.concat(tempTableColumn).concat(tableActionSearchColumn).map(column => {
      if (column) {
        const _column = Object.keys(column)[0];
        const _val = column[_column];
        if (!_.isEmpty(_column) && !_.isEmpty(String(_val))) {
          _params[_column] = _val;
        }
      }
    });
    params = Object.assign({
      currentPage: 1,
      pageSize: 10,
    }, _params, params);
    this.state.tableSearchParams = params;
    this.setState({tableLoading: true});
    this.tableAction(params).finally(() => this.setState({tableLoading: false}));
  };

  /**
   * 处理上个页面修改本页面返回后的数据
   */
  handelGhostPageData = () => {
    if (this.props.ghostPageData) {
      Object.keys(this.props.ghostPageData).map(key => {
        this.state[key] = this.props.ghostPageData[key];
      });
      const {tableSearchParams = {}} = this.state;
      const {sort, direction} = tableSearchParams;
      if (sort && direction) this.setState({defaultSortOrder: {[sort]: direction === 'asc' ? 'ascend' : 'descend'}});
    }
  };

}

BaseTablePage.propTypes = {};

BaseTablePage.defaultProps = {};
