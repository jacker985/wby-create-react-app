const CALL_API = 'CALL_API';
const { Promise } = window;
export default ({
	toast = () => { },
	showLoading = () => { },
	hideLoading = () => { },
	request
}) => store => next => (action) => {
	const {
		endpoint,
		data,
		types,
		ignoreToast,
		ignoreLoading,
		method,
		dataType,
	} = (action.payload && action.payload[CALL_API]) || {};
	if (!endpoint || !types) {
		return next(action)
	}

	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('CALL_API 的 action types 必须包含发送、成功、失败三个actionType。')
	}

	if (!request || typeof request !== 'function') {
		throw new Error('request 必须是一个函数，并且返回值必须是一个promise')
	}

	const [requestType, successType, failureType] = types;
	next(requestType());

	return new Promise(async (resolve, reject) => {
		ignoreLoading !== true && await showLoading();
		try {
			let res;
			res = await request(endpoint, {
				data,
				type: method || 'GET',
				dataType,
				method: method || 'GET',
			});
			resolve(res);
			hideLoading();
			console.log('请求:success', 'response', res, { endpoint, data });
			false && console.warn(store);
			return next(successType(res))
		} catch (ex) {
			console.warn('请求:failure', 'response', ex, { endpoint, data });
			const errorMsg = (ex && (ex.responseText || ex.statusText || ex.errorMsg)) || '系统繁忙，请重试';
			reject(ex);
			hideLoading();
			if (ignoreToast !== true) {
				toast({ text: errorMsg })
			}
			return next(failureType(ex))
		}
	});
}
