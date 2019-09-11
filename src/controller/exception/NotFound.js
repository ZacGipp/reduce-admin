/**
 * Created by Zed on 2019/8/13.
 */
import React from 'react';
import { Result, Button } from 'antd';
import Path from "../../router/path";
import {withRouter} from "react-router-dom";

@withRouter
export default class NotFound extends React.Component {

  render() {
    return <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => this.props.history.push(Path.ROOT)}>Back Home</Button>}
    />;
  }
}
