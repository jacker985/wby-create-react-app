import api from '../api'
import browserInfo from './browserInfo'
import { notification } from 'antd'
const { location } = window;

export const toast = ({ text }) => {
	notification.error({
		message: text
	})
}
export const showLoading = () => {

}

export const hideLoading = () => {

}

const debug = false;
export const request = (endpoint, options) => {
	if (debug) {
		endpoint = `/mock/${endpoint}.json`
	}
	const type = (options.type || 'get').toLowerCase();

	if (type == 'post') {
		return api[type](endpoint, options.data);
	} else {
		return api[type](endpoint, { params: options.data });
	}

}

/**
 * 获取url中的参数
 * @param str 默认是location.href
 */
export const getUrlParam = (str = location.href) => {
	const arr = str.split('?')[1] ? str.split('?')[1].split('&') : [];
	const res = {};
	if (arr.length > 0) {
		arr.forEach((item) => {
			const index = item.indexOf('=');
			let name;
			let value;
			if (index > -1) {
				name = item.substring(0, index);
				value = item.substring(index + 1, item.length);
				if (value.indexOf('#/') > -1) {
					value = value.substring(0, value.indexOf('#/'));
				}
			}
			if (value != undefined) res[name] = value;
		})
	}
	return res;
};

window.getUrlParam = getUrlParam;

export { calcSum } from './calcSum'
export { browserInfo };
