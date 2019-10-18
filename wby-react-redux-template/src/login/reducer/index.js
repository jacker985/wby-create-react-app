import { combineReducers } from 'redux'
import { handleAction, handleActions, combineActions } from 'redux-actions';
import * as types from '../constants/ActionTypes'

import {
	login_success,
	getUserLoginInfo_success,
	getQrCode_success,
	getLoginConfig_success,
	qrViewInfo_success,
	clearLoginUserList,
	resetNeed_verify,
	verifysms_success
} from '../actions'

export const userLoginInfo = handleAction(getUserLoginInfo_success, (state, action) => {
	return {
		...state,
		...action.payload.data
	}
}, {})


export const qrCode = handleAction(getQrCode_success, (state, action) => {
	return {
		...state,
		...action.payload.data
	}
}, {})
//获取token
export const UserInfo = (state = {}, action) => {
	switch (action.type) {
		case types.X_ACCESS_TOKEN:
			return {
				...action.payload.data
			};
		default:
			return state
	}
};
//获取登录配置
// export const loginConfig = (state = {}, action) => {
// 	switch (action.type) {
// 		case types.GET_LOGIN_CONFIG:
// 			return {
// 				...action.payload.data
// 			};
// 		default:
// 			return state;
// 	}
// };

// export const loginConfig = handleAction(getLoginConfig_success, (state, action) => {
// 	return {
// 		...state,
// 		...action.payload.data
// 	}
// }, {})

export const loginConfig = handleActions({
	[combineActions(getLoginConfig_success, login_success, verifysms_success)]: (state, action) => {
		return {
			...state,
			...action.payload.data
		}
	},
	[resetNeed_verify]: (state) => ({
		...state,
		need_verify: false
	})
}, {})

// export const qrViewInfo = handleAction(qrViewInfo_success, (state, action) => {
// 	return {
// 		...state, ...action.payload.data
// 	}
// }, {})

export const qrViewInfo = handleActions({
	[qrViewInfo_success]: (state, action) => {
		return {
			...state, ...action.payload.data
		}
	},
	[clearLoginUserList]: () => {
		return {}
	}
}, {})

export default combineReducers({
	userLoginInfo,
	UserInfo,
	loginConfig,
	qrCode,
	qrViewInfo
})
