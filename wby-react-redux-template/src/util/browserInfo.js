export default {
	versions: (function () {
		const u = window.navigator.userAgent;
		const android = u.toLocaleLowerCase().indexOf('android') > -1 || u.indexOf('linux') > -1;
		const iPhone = u.toLocaleLowerCase().indexOf('iphone') > -1;
		return {// 移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, // IE内核
			presto: u.indexOf('Presto') > -1, // opera内核
			webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), // 是否为移动终端
			// ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			ios: !!u.match(/\(Mac/i),
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, // 是否iPad
			webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
			weixin: !!u.match(/MicroMessenger/i), // 是否是微信内打开
			isDing: !!u.match(/ding\s?talk/i) && (android || iPhone), // 是否是钉钉内打开
			isDing2: false, // test
			isPCDing: !!u.match(/ding\s?talk/i) && (!android && !iPhone),
			alipay: !!u.match(/alipayclient/i),
            isEdge : u.indexOf("Edge") > -1 //是否edge浏览器打开
		};
	}()),
}
