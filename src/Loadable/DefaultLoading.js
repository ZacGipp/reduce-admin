/**
 * Created by Zed on 2019/8/23.
 */

import React from "react";
import {Skeleton} from "antd";

export default class DefaultLoading extends React.Component {
  render() {
    return <Skeleton active loading={true} title={false} paragraph={{rows: 8}} />;
  }
}
