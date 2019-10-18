import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd';
import "./error.less";
class Error extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='error-big'>
				<div className='error-404'>
					<Icon type="frown-o" />
					<span className='error'>404 </span>
				</div>
				<p className='error-english'>NOT  FOUND!</p>
				<p className='error-sorry'>抱歉！您访问的页面不存在，请重新加载！</p>
				<p className='error-goIndexs'>
					<Link to={'/loginSuccess'}>返回首页</Link></p>
			</div>
		);
	}
}

export default Error;
