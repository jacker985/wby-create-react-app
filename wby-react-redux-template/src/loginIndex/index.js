import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'

// 懒加载路由级组件
const LoginIndex = lazyLoadComponent(() => import('./containers/LoginIndex'))


class LoginSuccess extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Route path='/loginSuccess' component={LoginIndex} />
			</div>
		);
	}
}

export default LoginSuccess;
