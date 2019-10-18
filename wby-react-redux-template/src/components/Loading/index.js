import React from "react"
import { Spin, Alert } from 'antd'
import './index.less'

const Loading = ({ error, pastDelay, timeOut }) => {
	if (error) {
		if (window.navigator.userAgent.indexOf("compatible") > -1 && window.navigator.userAgent.indexOf("MSIE") > -1) {
			return null;
		}
		return <Alert
			message="错误!"
			description="页面加载错误, 请刷新页面或检查您的网络设置!"
			type="error"
			showIcon
		/>
	} else if (pastDelay) {
		return <Spin tip="加载中...">
			<div className="skeleton-container">
				<div className="animated-background head" style={{ width: "90%" }} />
				<div className="animated-background head" />
				<div className="animated-background body" />
			</div>
		</Spin>;
	} else if(timeOut){
		return null
	} else {
		return null
	}
}
export default Loading
