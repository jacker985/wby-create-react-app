export default {
	login: {
		sendsms: '/sendsms', //登录发送短信
		verifysms: '/verifysms', //登录短信验证
		getUserLoginInfo: '/cross/getUserLoginInfo',
		getQrCode: '/wechatAuth/qrCode',
		login: '/login',
		loginWithSign: '/wechatAuth/loginWithSign',	//微信登录
		qrViewInfo: '/wechatAuth/qrViewInfo',		//获取扫码状态
		getLoginConfig: '/wechatAuth/getLoginConfig',
	}
}

/**
 * qrViewInfo 扫码成功后，会返回user_list ,
 * loginWithSign   参数：user_id 
 * getLoginConfig  返回跳转的链接
 */
