import React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';
import injectSheet from 'react-jss';
import {getLoginForm, getRememberedPath, setLoginForm, setToken} from "../../util/auth";
import {login} from "../../services/common";
import {getRandom} from "../../util/ComUtils";
import Const from "../../util/Const";
import Path from "../../router/path";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import appAction from "../../redux/action/app";
import Particles from 'react-particles-js';
import BackImg from "../../assets/images/login_background.png";
import * as md5 from "md5";

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `#eee url(${BackImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  loginBox: {
    position: 'relative',
    left: '50%',
    padding: '.2rem 2rem',
    marginLeft: '-9rem',
    marginTop: '10rem',
    width: '18rem',
    background: 'rgba(255, 255, 255, .2)',
    borderRadius: '.5rem',
  },
  loginHeader: {
    textAlign: 'center',
    lineHeight: 2,
    fontSize: '1.5rem',
    color: '#fff',
  },
  loginForm: {
  },
  validImg: {
    display: 'inline-blank',
    marginLeft: '1rem',
    marginTop: '4px',
    width: '5rem',
    height: '32px',
  },
  loginFormForgot: {
    float: 'right'
  },
  loginFormButton: {
    width: '100%'
  },
};

@withRouter
@injectSheet(styles)
@connect(state => ({}), {
  getUserInfo: appAction.getUserInfo
})
class LoginPage extends React.Component {

  state = {
    username: '123123',
    password: '',
    fromCookie: false,
    validateCodeKey: getRandom(16),
  };

  componentDidMount() {
    const userInfoStr = getLoginForm();
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      const { username, password } = userInfo;
      this.setState({username});
      if (password) {
        this.setState({
          password,
          fromCookie: true,
        });
      }
    }
  }

  render() {
    const {classes} = this.props;
    const { getFieldDecorator } = this.props.form;
    const {validateCodeKey, username, password} = this.state;
    const validateImg = Const.BASE_API + '/imageCode.png?key=' + validateCodeKey;
    return (
      <div className={classes.container}>
        <Particles style={{position: 'absolute'}} />
        <section className={classes.loginBox}>
          <header className={classes.loginHeader}>系统登录</header>
          <Form onSubmit={this.handleSubmit} className={classes.loginForm}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入账户！' }],
                initialValue: username,
              })(
                <Input allowClear prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户" onChange={v => this.props.form.setFieldsValue({password: ''})} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
                initialValue: password,
              })(
                <Input.Password visibilityToggle prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" onChange={e => this.setState({fromCookie: false})} />
              )}
            </Form.Item>
            <div>
              <Form.Item style={{display: 'inline-block', width: '55%'}}>
                {getFieldDecorator('validateCode', {
                  rules: [{ required: true, message: '请输入验证码！' }],
                })(
                  <Input placeholder="验证码" />
                )}
              </Form.Item>
              <img
                className={classes.validImg}
                src={validateImg}
                onClick={this.handleValidateCode}
              />
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={classes.loginFormButton} loading={false}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {validateCodeKey, fromCookie} = this.state;
        const {username, validateCode, password} = values;
        let loginForm = {
          username: username.trim(),
          password: fromCookie ? password : md5(password),
          validateCode,
          validateCodeKey,
        };
        login(loginForm).then(res => {
          setToken(res.token);

          const userInfo = { username };
          if ((Const.LOGIN_WHITE_NAME_LIST.join(',') + ',').indexOf(username.trim() + ',') > -1) {
            userInfo.password = loginForm.password;
          }
          setLoginForm(JSON.stringify(userInfo));

          this.props.getUserInfo().finally(() => this.props.history.replace(getRememberedPath() || Path.HOME));
        }).catch(err => {});
      }
    });
  };


  handleValidateCode = () => {
    this.setState({validateCodeKey: getRandom(16)});
  };
}

export default Form.create()(LoginPage);
