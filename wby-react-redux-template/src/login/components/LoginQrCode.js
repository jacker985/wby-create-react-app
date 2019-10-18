import React from 'react';
import { Icon, Button, Row, Col } from 'antd';

import { LoginType } from '../constants'


export default ({ qrCode, reloadQr, isloadingQr, setLoginType, loginWithSign, user_list }) => {
	return (
		<div className='login-qr'>
			<Row>
				<Col span={user_list.length > 0 ? 12 : 24}>
					<div>
						<a href='javascript:void(0)' onClick={reloadQr}>
							{isloadingQr ? <Icon type="loading" /> : <Icon type="reload" />}刷新</a>
					</div>
					<img className='thumb' width={300} src={qrCode.url} alt="" />
				</Col>
				<Col span={12}>
					{
						user_list.map((item, index) => {
							return <div key={index}>
								<Button
									onClick={() => loginWithSign(item.user_id)}
								>{item.real_name}({item.user_group_name_desc})</Button>
							</div>
						})
					}
				</Col>
			</Row>
			<Button className="login-form-button" onClick={() => setLoginType(LoginType.pwd)}>返回使用账号登陆</Button>
		</div>
	)
}
