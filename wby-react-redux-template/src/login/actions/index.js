import Interface from '../constants/Interface'
import { createHttpAction } from 'redux-action-extend'
import { createAction } from 'redux-actions';

export const {
	getUserLoginInfo,
	getUserLoginInfo_success
} = createHttpAction('getUserLoginInfo', Interface.login.getUserLoginInfo, {
	method: 'get',
	isHttp: true,
	ignoreToast: true,
	ignoreLoading: true,
});
export const {
	getQrCode,
	getQrCode_success
} = createHttpAction('getQrCode', Interface.login.getQrCode);

export const {
	login,
	login_success
} = createHttpAction('login', Interface.login.login, {
	method: 'post'
})

export const {
	sendsms
} = createHttpAction('sendsms', Interface.login.sendsms, {
	method: 'post'
})

export const {
	verifysms,
	verifysms_success
} = createHttpAction('verifysms', Interface.login.verifysms, {
	method: 'post'
})

export const { qrViewInfo, qrViewInfo_success } = createHttpAction('qrViewInfo', Interface.login.qrViewInfo)
export const { loginWithSign } = createHttpAction('loginWithSign', Interface.login.loginWithSign, {
	method: 'post'
})
//清除一个微信绑定多个账号的用户列表
export const clearLoginUserList = createAction('clearLoginUserList', () => {
	return {};
})


// export const getLoginConfig = () => (dispatch) => {
// 	return api.post('/wechatAuth/getLoginConfig', {}).then((response) => {
// 		if (response.code === 200) {
// 			const { data } = response;
// 			debugger
// 			dispatch({
// 				type: GET_LOGIN_CONFIG,
// 				payload: {
// 					data
// 				}
// 			})
// 		} else {
// 			console.log('请求出错啦')
// 		}
// 	})
// };

export const {
	getLoginConfig,
	getLoginConfig_success
} = createHttpAction('getLoginConfig', Interface.login.getLoginConfig, {
	method: 'post'
})

export const resetNeed_verify = createAction('resetNeed_verify')
