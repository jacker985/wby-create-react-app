import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { LoginType } from '../constants'

const qc_code = require('../images/qc_code.png');
const FormItem = Form.Item;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 19 },
	},
};
function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const LoginForm = ({ form, handleSubmit, setLoginType, resetNeed_verify, sendsms, loginConfig, stateVerification, scoreNum }) => {

	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

	const userNameError = isFieldTouched('userName') && getFieldError('userName');
	const passwordError = isFieldTouched('password') && getFieldError('password');

	const { need_verify } = loginConfig;
	return (
		<div className="login-form">
			<p className="scan_box">
				<a href="javascript:;" onClick={() => setLoginType(LoginType.qr)}>
					<span style={{ verticalAlign: 11, color: '#7D7272' }}><Icon type="scan" /> 扫码登录</span>
					<img src={qc_code} width={50} />
				</a>
			</p>
			<Form onSubmit={handleSubmit}>
				<FormItem
					{...formItemLayout}
					label="用户名"
					validateStatus={userNameError ? 'error' : ''}
					help={userNameError || ''}
					// className= {isUserFocus ? "ant_form_item_focus" : ''}
					className="ant_form_username_focus"
				>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: '请输入用户名' }],
					})(
						<Input onChange={resetNeed_verify} placeholder="这里键入用户名" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码"
					validateStatus={passwordError ? 'error' : ''}
					help={passwordError || ''}
					className="ant_form_password_focus"
				>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码' }],
					})(
						<Input type="password" placeholder="这里键入密码" />
					)}
				</FormItem>
				{need_verify ? <FormItem
					{...formItemLayout}
					label="验证码"
					// validateStatus={passwordError ? 'error' : ''}
					// help={passwordError || ''}
					className="ant_form_password_focus"
				>
					{getFieldDecorator('smscode', {
						rules: [{ required: true, message: '请输入短信验证码' }],
					})(
						<Input className='smscode-input' type="text" placeholder="请输入短信验证码" />
					)}
					<Button disabled={stateVerification === 'ing' ? true : false} onClick={sendsms} style={{ width: 102 }}>
						{stateVerification === 'over' ? '重新发送'
							: stateVerification === 'ing' ? `${scoreNum}s`
								: '获取验证码'}
					</Button>

				</FormItem> : null}
				<Button
					htmlType="submit"
					className="login-form-button"
					disabled={hasErrors(getFieldsError())}
				>登录</Button>
			</Form>
		</div>
	)
}

export default Form.create()(LoginForm)
