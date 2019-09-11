import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Table, Button, Dropdown, Menu, Icon, Descriptions, Popconfirm} from 'antd';
import injectSheet from "react-jss";
import Const from "../../util/Const";

const {Column, ColumnGroup} = Table;

const styles = {
  img: {
    width: '2.5rem',
  },
  searchContainer: {
    '&:after': {
      content: '" "',
      clear: 'both',
      display: 'block',
      height: 0,
      visibility: 'hidden',
    }
  },
  searchItem: {
    maxWidth: '25rem',
    minWidth: '12rem',
    margin: 0,
    float: 'left',
    marginRight: '.5rem',
  },
  cell: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    width: '100px',
    overflow: 'hidden',
  },
  btns: {
    display: 'flex',
    justifyContent: 'center',
  }
};

@injectSheet(styles)
class CustomTable extends Component {
  pagination = { // 分页配置
    position: 'bottom',
    size: "small",
    // defaultCurrent: this.currentPage,
    // defaultPageSize: this.pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
    total: 0,
    showTotal: (total) => {
      return `共 ${total} 条`;
    },
  };
  rowSelection = { // 选择功能的配置。
    type: 'checkbox', // 多选/单选，checkbox or radio
    onChange: (selectedRowKeys, selectedRows) => { // 选中项发生变化时的回调
      this.props.handleSelectionChange(selectedRows, selectedRowKeys);
    },
    // getCheckboxProps: record => ({ // 选择框的默认属性配置
    //   disabled: typeof record.checkable === "function" && record.checkable(record), // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  state = {
    sortOrder: {}, // 排序方式
  };


  render() {
    const {columns, data: tableData, tableCanSelect, pagination, loading, showDetail} = this.props;
    const {data = [], totalRow = 0, currentPage = 1, pageSize = 10} = tableData() || {};
    this.pagination.total = totalRow;
    this.pagination.defaultCurrent = currentPage;
    this.pagination.defaultPageSize = pageSize;
    return (
      <Table
        ref="customTable"
        loading={loading}
        dataSource={data}
        rowKey={record => record.id}
        expandedRowRender={showDetail ? this.expandedRowRender : null}
        expandRowByClick={true}
        scroll={{x: true}}
        rowSelection={tableCanSelect ? this.rowSelection : null}
        pagination={pagination && this.pagination}
        onChange={this.handelTableChange}>
        {
          columns.map(column => column.children ? <ColumnGroup title={column.label} key={column.label}>
            {
              column.children.map(child => this.columnHtml(child))
            }
          </ColumnGroup> : this.columnHtml(column))
        }
      </Table>
    );
  }

  /**
   * 监听表格分页、筛选、排序等变化
   * @param pagination
   * @param filters
   * @param sorter
   */
  handelTableChange = (pagination, filters, sorter) => {
    const {handelTableChange} = this.props;
    handelTableChange && handelTableChange(pagination, filters, sorter);
  };

  /**
   * 表格列
   * @param column
   * @return {*}
   */
  columnHtml(column) {
    const {classes, defaultSortOrder} = this.props;
    return !column.inDetail && <Column
      title={column.label}
      sorter={column.sortable}
      key={column.label}
      defaultSortOrder={defaultSortOrder[column.columnKey] || false}
      align="center"
      // fixed={isMobile() ? false : (column.label === Const.TABLE_BTN_TITLE ? 'right' : column.fixed)}
      render={(text, record, index) => {
        // console.log(text, record, index);
        if (column.label === Const.TABLE_BTN_TITLE && column.buttons) {
          const btns = column.buttons;
          if (btns.length <= 2) {
            return btns.map(btn => this.actionBtn(btn, record));
          } else {
            const btnF = btns[0];
            const restBtns = btns.slice(1, btns.length);
            return <div className={classes.btns}>
              {this.actionBtn(btnF, record)}
              <Dropdown trigger={['click']} overlay={<Menu>
                {
                  restBtns.map((restBtn, ind) => <Menu.Item key={ind}>
                    {this.actionBtn(restBtn, record, {
                      block: true,
                      style: {margin: 0}
                    })}
                  </Menu.Item>)
                }
              </Menu>}>
                <Button size="small" type="primary" style={{marginTop: '.5rem'}}>
                  更多 <Icon type="down"/>
                </Button>
              </Dropdown>
            </div>;
          }
        }
        if (column.formatter && typeof column.formatter === 'function') {
          return <span className={classes.cell}
                       style={{width: column.minWidth + 'px'}}>{column.formatter(record)}</span>;
        }
        const row = record[column.columnKey];
        if (column.imgColumn) {
          return <img className={classes.img} src={row} alt=""/>;
        }
        return <span className={classes.cell} style={{width: column.minWidth + 'px'}}>{row}</span>;
      }}
    />;
  }

  /**
   * 表格操作按钮
   * @param btn
   * @param row
   * @param props
   * @return {*}
   */
  actionBtn(btn, row, props = {}) {
    const {type, label, confirmable} = btn;
    return confirmable
      ? <Popconfirm placement="top" title="确认执行此操作？" onConfirm={() => this.props.handelTableButtonsEvent(type, row)} okText="Yes" cancelText="No">
        <Button
          size="small"
          key={label + type}
          style={{margin: '.5rem .5rem 0 0'}}
          type={(type === 'del' || type === 'danger') ? 'danger' : 'primary'}
          {...props}>
          {
            typeof label === 'function' ? label(row) : label
          }
        </Button>
    </Popconfirm>
      : <Button
      size="small"
      key={label + type}
      style={{margin: '.5rem .5rem 0 0'}}
      type={(type === 'del' || type === 'danger') ? 'danger' : 'primary'}
      onClick={e => {
        e.preventDefault();
        this.props.handelTableButtonsEvent(type, row);
      }}
      {...props}>
      {
        typeof label === 'function' ? label(row) : label
      }
    </Button>;
  }

  expandedRowRender = (record, index, indent, expanded) => {
    const {columns, classes} = this.props;
    return <Descriptions column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
      {
        columns.map(column => (
          column.label !== Const.TABLE_BTN_TITLE && <Descriptions.Item label={column.label} key={column.label}>
            {
              (column.formatter && typeof column.formatter === 'function')
                ? column.formatter(record)
                : (column.imgColumn
                  ? <img className={classes.img} src={record[column.columnKey]} alt=""/>
                  : record[column.columnKey]
                )
            }
          </Descriptions.Item>
        ))
      }
    </Descriptions>;
  };

}

CustomTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.func,
  handelTableButtonsEvent: PropTypes.func,
  tableCanSelect: PropTypes.bool,
  pagination: PropTypes.bool,
  loading: PropTypes.bool,
  handleSelectionChange: PropTypes.func,
  showDetail: PropTypes.bool,
  handelTableChange: PropTypes.func,
  defaultSortOrder: PropTypes.object,
};
CustomTable.defaultProps = {
  columns: () => console.log('no set table prop columns'),
  data: () => console.log('no set table prop data'),
  handelTableButtonsEvent: () => console.log('no set table prop handelTableButtonsEvent'),
  tableCanSelect: false,
  pagination: true,
  loading: false,
  handleSelectionChange: f => f,
  showDetail: true,
  handelTableChange: () => console.log('no set table prop handelTableChange'),
  defaultSortOrder: {},
};

export default CustomTable;
