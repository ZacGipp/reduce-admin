import React from 'react';
import {connect} from "react-redux";
import AppIni from "../component/layout/AppIni";
import appRoutes from "../router";

@connect(
  state => ({
    appLoaded: state.app.appLoaded
  }),
)
export default class App extends React.Component {
  render() {
    const {appLoaded} = this.props;
    return (
      <div>
        <AppIni />
        {
          appLoaded && appRoutes()
        }
      </div>
    );
  }
}
