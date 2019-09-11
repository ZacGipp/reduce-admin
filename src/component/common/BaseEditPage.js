/**
 * Created by Zed on 2019/8/22.
 */
import React from "react";
import {Button, Form, Input} from "antd";
import BasePage from "./BasePage";
import JPanel from "../panel/JPanel";
import CommonMsg from "../layout/CommonMsg";

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

class BaseEditPage extends BasePage {

  title = '编辑';
  editFun = '';

  state = {
    loading: false,
  };

  render() {
    return <JPanel title={this.title}>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        {
          this.contentHtml()
        }

        {
          this.bottomBtnHtml()
        }
      </Form>

    </JPanel>;
  }

  contentHtml = () => {
    return '你什么也没写！';
  };

  bottomBtnHtml = () => {
    return <Form.Item
      wrapperCol={{
        xs: {span: 24, offset: 0},
        sm: {span: 16, offset: 8},
      }}
    >
      <Button loading={this.state.loading} type="primary" htmlType="submit">
        提交
      </Button>

      <Button style={{marginLeft: '1rem'}} type="primary" onClick={e => {
        e.preventDefault();
        this.pageBack();
      }}>取消</Button>
    </Form.Item>;
  };

  handleSubmit = (e) => {
    e && e.preventDefault();
    const {form} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (this.editFun) {
          this.setState({loading: true});
          this.editFun(values).then(res => {
            CommonMsg.success('操作成功！');
            setTimeout(this.pageBack, 500);
          }).finally(() => this.setState({loading: false}));
        } else CommonMsg.error('未设置action');
      }
    });
  };

}

export default BaseEditPage;
