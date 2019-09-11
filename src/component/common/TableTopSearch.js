/**
 * Created by Zed on 2019/8/21.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Button, Form, Input, DatePicker, Select, Cascader, TreeSelect} from 'antd';
import injectSheet from "react-jss";

const {RangePicker} = DatePicker;

const styles = {
  searchContainer: {
    clear: 'both',
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
    marginRight: '.5rem !important',
  },
};

@injectSheet(styles)
class TableTopSearch extends Component {

  componentDidMount() {
    this.init();
  }

  render() {
    const {classes, columns} = this.props;
    return (
      <Form onSubmit={this.handelSearch} className={classes.searchContainer}>
        {
          columns.map(column => this.topSearchHtml(column))
        }
        {
          columns.length > 0 ? <Form.Item className={classes.searchItem}>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item> : ''
        }
      </Form>
    );
  }

  topSearchHtml(column) {
    const {classes, form} = this.props;
    const {getFieldDecorator} = form;
    const {type, column: columnKey, label, value, options = [], multiple} = column;
    switch (type) {
      case 'input':
        return <Form.Item className={classes.searchItem} key={columnKey}>
          {getFieldDecorator(columnKey, {initialValue: value})(
            <Input placeholder={label || "请输入"} allowClear/>
          )}
        </Form.Item>;
      case 'option':
        return <Form.Item className={classes.searchItem} key={columnKey}>
          {getFieldDecorator(columnKey, {initialValue: value})(
            <Select allowClear mode={multiple ? "multiple" : ''} placeholder={label || "请选择"}>
              {
                options.map(i => <Select.Option value={i.value} key={i.value}>{i.label}</Select.Option>)
              }
            </Select>
          )}
        </Form.Item>;
      case 'cascader':
        return <Form.Item className={classes.searchItem} key={columnKey}>
          {getFieldDecorator(columnKey, {initialValue: value})(
            <Cascader allowClear options={options} placeholder={label || "请选择"}/>
          )}
        </Form.Item>;
      case 'tree':
        return <Form.Item className={classes.searchItem} key={columnKey}>
          {getFieldDecorator(columnKey, {initialValue: value})(
            <TreeSelect
              allowClear
              multiple={multiple}
              treeData={options}
              placeholder={label || "请选择"}
            />
          )}
        </Form.Item>;
      case 'rangeTimePicker':
        return <Form.Item className={classes.searchItem} key={columnKey}>
          {getFieldDecorator(columnKey, {initialValue: value})(
            <RangePicker showTime allowClear format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']}/>
          )}
        </Form.Item>;
      default:
        break;
    }
  }

  handelSearch = (e) => {
    e && e.preventDefault();
    const {handelSearch, form} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let params = [];
        Object.keys(values).map(key => {
          const row = values[key];
          if (String(row)) {
            if (key.indexOf(',') > -1) {
              if (row[0] && row[1]) {
                const keys = key.split(',');
                params.push({[keys[0]]: row[0].format('YYYY-MM-DD HH:mm:ss')});
                params.push({[keys[1]]: row[1].format('YYYY-MM-DD HH:mm:ss')});
              }
            } else {
              params.push({[key]: row});
            }
          }
        });
        handelSearch && handelSearch(params);
      }
    });
  };

  /**
   * 初始化组件赋值
   */
  init = () => {
    const {columns} = this.props;
    let promises = [];
    columns.forEach((column) => {
      const {fetch = {}} = column;
      const {action, getOption, defaultValue} = fetch;
      if (action) {
        promises.push(new Promise((resolve) => {
          action().then(res => {
            column.options = getOption ? res.map(i => getOption(i)) : res;
            if (defaultValue) column.value = column.options[0].value;
            resolve();
          });
        }));
      }
    });
    Promise.all(promises).then(() => {
      const {defaultSearchData, initSearch} = this.props;
      let params = [];
      columns.map(column => {
        const {column: columnKey} = column;
        const row = column.value = defaultSearchData[columnKey];
        if (String(row)) {
          const columnKey = column.column;
          if (columnKey.indexOf(',') > -1) {
            if (row[0] && row[1]) {
              const keys = columnKey.split(',');
              params.push({[keys[0]]: row[0].format('YYYY-MM-DD HH:mm:ss')});
              params.push({[keys[1]]: row[1].format('YYYY-MM-DD HH:mm:ss')});
            }
          } else {
            params.push({[columnKey]: row});
          }
        }
      });

      initSearch && initSearch(params);
    });
  };

}

TableTopSearch.propTypes = {
  columns: PropTypes.array,
  handelSearch: PropTypes.func,
  initSearch: PropTypes.func,
  defaultSearchData: PropTypes.object,
};
TableTopSearch.defaultProps = {
  columns: () => console.log('no set table prop columns'),
  handelSearch: () => console.log('no set table prop handelSearch'),
  defaultSearchData: {},
};

/**
 * column示例：
 * [
 * {column: 'roleName', label: '请输入角色名称', type: 'input'},
 * {column: 'test', label: '请选择', type: 'option', options: [], fetch: {
 *   action: getShareChannels,
 *   getOption: r => ({label: `${r.name}(${r.code})`, value: r.code}),
 *   defaultValue: true,
 *   }
 * },
 * ]
 */

export default Form.create()(TableTopSearch);
