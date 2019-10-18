//判断是否是中文
export const isChinese = (str) => {
	var lst = /[\u4E00-\u9FA5]/i;
	return lst.test(str);
}
//计算字符串个数
export const countstrlen = (str) => {
	var strlength = 0;
	for (var i = 0; i < str.length; i++) {
		if (isChinese(str.charAt(i)) == true)
			strlength = strlength + 2;
		else
			strlength = strlength + 1;
	}
	return strlength;
}
export default {
	countstrlen
}
//验证是否为空
var hasOwnProperty = Object.prototype.hasOwnProperty;
export const isEmptyData = (obj) => {
	// 本身为空直接返回true
	if (obj == null) return true;
	// 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;
	//最后通过属性长度判断。
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}
//
