/**
 * Created by Zed on 2019/8/22.
 */
import React from "react";
import {Form, Input} from "antd";
import BaseEditPage from "../../../component/common/BaseEditPage";
import {roleModify} from "../../../services/account";

class EditPage extends BaseEditPage {

  title = `${this.formData.id ? '修改' : '添加'}角色`;
  editFun = roleModify;

  contentHtml = () => {
    const {getFieldDecorator} = this.props.form;
    const {id, roleName, description} = this.formData;
    return <div>
      {
        id && <Form.Item label="id">
          {getFieldDecorator('id', {initialValue: id})(
            <Input disabled placeholder={"请输入"}/>
          )}
        </Form.Item>
      }

      <Form.Item label="角色名称">
        {
          getFieldDecorator('roleName', {
            initialValue: roleName,
            rules: [
              {required: true, message: '请输入角色名称！'}
            ],
          })(
            <Input placeholder={"请输入"} allowClear/>
          )
        }
      </Form.Item>

      <Form.Item label="备注">
        {getFieldDecorator('description', {
          initialValue: description,
          rules: [
            {required: true, message: '请输入备注！'}
          ],
        })(
          <Input.TextArea placeholder={"请输入"}/>
        )}
      </Form.Item>

    </div>;
  }
}

export default Form.create()(EditPage);
