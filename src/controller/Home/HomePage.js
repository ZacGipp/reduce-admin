/**
 * Created by Zed on 2019/8/6.
 */
import React from "react";
import BannerIcon from "../../assets/images/logo2.png";
import injectSheet from "react-jss";

@injectSheet({
  box: {
    width: '100%',
    height: '56vh',
    position: 'relative',
  },
  img: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-2.25rem',
    width: '80%',
    transform: 'translateX(-50%)',
  }
})
export default class HomePage extends React.Component {

  render() {
    const {classes} = this.props;
    return <div className={classes.box}>
      <img className={classes.img} src={BannerIcon} alt=""/>
    </div>;
  }
}
