import axios from 'axios'
import { notification } from 'antd'

const { Promise } = window;

const NODE_ENV = process.env.NODE_ENV;
const origin = window.location.origin;
export const DoMain = NODE_ENV === 'production' ? origin : 'http://bentley.trunk.192.168.100.203.nip.io';
//const baseURI = DoMain + '';
const baseURI = '/api'
const otherURIReg = /^\/upload\/.*/;

// 处理下载 url
const downloadUrl = url => {
	let iframe = document.createElement('iframe')
	iframe.style.display = 'none'
	iframe.src = url
	iframe.onload = function () {
		document.body.removeChild(iframe)
	}
	document.body.appendChild(iframe)
}

const instance = axios.create({
	baseURL: baseURI,
	withCredentials: true,
	responseType: 'json',
	transformResponse: [function (data) {
		// 对 data 进行任意转换处理
		return typeof data === 'string' ? JSON.parse(data) : data;
		// return data
	}],
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	if (otherURIReg.test(config.url)) {
		// config.baseURL = ''
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
	// 处理下载请求
	if (response.headers && (response.headers['content-type'] === 'application/vnd.ms-excel' || response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
		downloadUrl(response.request.responseURL)
		return
	}
	// 对响应数据做点什么
	const { data } = response;
	if (data.code == 200 || data.code == 1000 || data.code == 999) {
		return data;
	} else if (data.code === 401) {
		window.myHistory && window.myHistory.push('/login');
		return Promise.reject({ errorMsg: data.message || data.msg });
	} else {
		return Promise.reject({ errorMsg: data.message });
	}
}, function (error) {
	// 对响应错误做点什么
	notification.error({
		message: '请求出错了' + error.message || error.msg
	})
	return Promise.reject({ error });
});

export default instance
