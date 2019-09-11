/**
 * Created by Zed on 2019/8/6.
 */
import React from "react";
import BaseView from "../../../component/common/BaseView";
import AdminTable from "./AdminTable";
import EditPage from "./EditPage";

export default class AdminList extends BaseView {
  initialPages = [{AdminTable}, {EditPage}];
}
