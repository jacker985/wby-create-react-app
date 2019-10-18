import React, { Component } from 'react'
import * as browserJudge from './browserInfo'
import { Alert } from 'antd';

// const Cookie = require('js-cookie');

class BrowserJudge extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		// let chromeLink = React.createElement('a', {
		//     'href': 'https://www.google.cn/chrome/',
		//     'target': '_blank'
		// }, 'Chrome浏览器');
		let chromeMessage = React.createElement('div', { id: 'ChromeTips' }, '为了您有更好的使用效果，请安装Chrome浏览器');
		let isOtherBrowser = (BrowserCore = {}) => {
			BrowserCore = browserJudge.default.versions;
			if (BrowserCore.trident || BrowserCore.presto || BrowserCore.weixin || BrowserCore.isDing || BrowserCore.isEdge) {
				return true
			} else if (BrowserCore.webKit || BrowserCore.gecko) {// 苹果、谷歌内核
				return false
			} else {
				return true
			}
		};
		return (
			<div>
				{
					isOtherBrowser() ? (
						<Alert
							message={chromeMessage}
							type="error"
							closable
							banner />
					) : null
				}
			</div>
		)
	}
}

export default BrowserJudge;
