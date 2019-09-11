/**
 * Created by Zed on 2019/8/6.
 */
import React from "react";
import BaseView from "../../../component/common/BaseView";
import RoleTable from "./RoleTable";
import EditPage from "./EditPage";
import AdminTable from "./AdminTable";

export default class RoleList extends BaseView {
  initialPages = [{RoleTable}, {EditPage}, {AdminTable}];
}
