import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as loginAction from '../actions/index'
import { resetSiderAuth } from '../../actions'
import PropTypes from 'prop-types'
// import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';

import LoginForm from '../components/LoginForm'
import LoginQrCode from '../components/LoginQrCode'

import { LoginType } from '../constants'
import { getUrlParam } from '../../util'
import { notification } from 'antd'
import BrowserJudge from '../../util/showBrowserJudge'
import './login.less'
const logo = require("../images/logo.png");
const Cookie = require('js-cookie');

let times = 59
class NormalLoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			loading: false,
			loginType: LoginType.pwd,
			stateVerification: 'wei',//发送验证码状态（wei：获取验证码;over:重新发送;ing:倒计时）
			scoreNum: 60,//倒计时秒数

		}
	}
	setTokenCookie = (data = {}) => {
		const { expires_in_days } = data;
		if (window.location.host === 'nb.weiboyi.com') {
			Cookie.set('token', data['X-Access-Token'], { domain: '.weiboyi.com', expires: expires_in_days, path: '/' })
		} else {
			Cookie.set('token', data['X-Access-Token'], { expires: expires_in_days, path: '/' })
		}
	}
	componentDidMount() {
		// this.loginForm.form.validateFields();
	}

	goHref = () => {
		const urlParam = getUrlParam();
		if (!urlParam.fromUrl) {
			// browserHistory.replace('/')
			this.props.history.replace('/loginSuccess');
		} else {
			window.location.href = decodeURIComponent(urlParam.fromUrl);
		}
	}
	handleSubmit = (e) => {
		const { loginReducer } = this.props;
		const { loginConfig, loginConfig: { need_verify } } = loginReducer;
		const token = loginConfig['X-Access-Token'];
		e.preventDefault();
		this.props.actions.resetSiderAuth()
		this.loginForm.validateFields(async (err, values) => {
			if (err) {
				return false;
			}
			if (!need_verify) {
				this.props.actions.login(values).then((response) => {
					const { data } = response;
					this.setTokenCookie(data);
					if (!data.need_verify) {
						this.goHref()
					} else {
						this.setState({
							loading: false
						})
					}
				}).catch(() => { })
			} else {
				this.props.actions.verifysms({ token, code: values.smscode }).then(() => {
					this.goHref();
				})
			}
		})
	}
	setQrLogin = async () => {
		await this.props.actions.getQrCode().then((data) => {
			if (data.code == 200) {
				this.setState({
					visible: true
				});
			}
		});
		const qrViewInfo = await new Promise((resolve) => {
			this._timer && window.clearInterval(this._timer);
			this._timer = window.setInterval(async () => {
				let qrViewInfo = await this.props.actions.qrViewInfo();
				if (qrViewInfo.data.success) {
					resolve(qrViewInfo);
					window.clearInterval(this._timer)
				}
			}, 3000)
		})

		const { user_list = [] } = qrViewInfo.data
		if (user_list.length === 0) {
			this.setTokenCookie(qrViewInfo.data.data)
			this.goHref();
		}

	}
	loginWithSign = async (user_id) => {
		const qrViewInfo = await this.props.actions.loginWithSign({ user_id });
		this.setTokenCookie(qrViewInfo.data)
		this.goHref();
	}

	setLoginType = (type) => {
		this.setState({
			loginType: type
		})

		if (type == LoginType.qr) {
			this.setQrLogin();
		} else if (type == LoginType.pwd) {
			window.clearInterval(this._timer)
			this.props.actions.clearLoginUserList()
		}
	}

	reloadQr = () => {
		this.setState({
			isloadingQr: true
		})
		this.props.actions.getQrCode().then(() => this.setState({ isloadingQr: false }))
	}
	sendsms = (token) => {
		// const { scoreNum, stateVerification } = this.state.scoreNum
		const that = this

		//设置初始默认值（防止按钮重复点击，造成计时器重复执行）
		that.setState({
			stateVerification: 'ing',
			scoreNum: times + 1
		})
		this.props.actions.sendsms({ token }).then(() => {
			let timer
			//设置验证计时开始
			setTimeout(() => {
				timer = window.setInterval(() => {
					//判断计时时间状态
					if (times == 0) {
						that.setState({
							stateVerification: 'over'//设置重新发送状态
						})
						times = 59;
						//清空计时
						window.clearTimeout(timer)
					} else {
						//设置时间变化
						that.setState({
							stateVerification: 'ing',//设置倒计时状态
							scoreNum: times--
						})
					}
				}, 1000)
			}, 0)
		})
	}
	resetNeed_verify = () => {
		const { loginReducer } = this.props;
		const { loginConfig: { need_verify } } = loginReducer;

		need_verify && this.props.actions.resetNeed_verify(false);
	}
	componentWillUnmount() {
		this.props.actions.clearLoginUserList()
	}
	render() {
		const { loginReducer } = this.props;
		const { qrCode, qrViewInfo, loginConfig } = loginReducer;
		const { user_list = [] } = qrViewInfo;
		const { isloadingQr, stateVerification, scoreNum } = this.state;
		const token = loginConfig['X-Access-Token'];
		return (
			<div>
				<BrowserJudge />
				<img src={logo} height={50} style={{ marginTop: 20, display: 'block', marginLeft: 25, width: 320 }} />
				<div className="loginContainer">
					{
						this.state.loginType == LoginType.pwd
							? <LoginForm
								loginConfig={loginConfig}
								resetNeed_verify={this.resetNeed_verify}
								handleSubmit={this.handleSubmit}
								ref={e => this.loginForm = e}
								sendsms={() => this.sendsms(token)}
								setLoginType={this.setLoginType}
								stateVerification={stateVerification}
								scoreNum={scoreNum} />
							: <LoginQrCode
								isloadingQr={isloadingQr}
								reloadQr={this.reloadQr}
								qrCode={qrCode}
								setLoginType={this.setLoginType}
								loginWithSign={this.loginWithSign}
								user_list={user_list}
							/>
					}
				</div>
			</div>)
	}
}

NormalLoginForm.propTypes = {
	token: PropTypes.string.isRequired
};
const mapStateToProps = (state) => {
	return {
		//登陆前，登录后，二维码
		token: state.loginReducer.UserInfo['X-Access-Token'] || '',
		expires_in_days: state.loginReducer.UserInfo.expires_in_days || '',
		loginReducer: state.loginReducer
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...loginAction, resetSiderAuth
	}, dispatch)
});

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(withRouter(NormalLoginForm))
