
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { Router, Route, IndexRedirect } from 'react-router';
import store, { history } from './store';
import "babel-polyfill";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './index.less'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

//顶级根目录页面
import App from './containers/App'
import Login from './login/container/Login'
import LoginSuccess from './loginIndex/index'
//404错误页面
import ErrorIndex from './containers/error'

render(
	<LocaleProvider locale={zhCN}>
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' render={() => (<Redirect to="/loginSuccess" />)} />
					<Route path='/login' component={Login} />

					<App history={history}>
						<Switch>
							<Route path='/loginSuccess' component={LoginSuccess} />
							<Route path='/error' component={ErrorIndex} />
							<Redirect to={'/error'} />
						</Switch>
					</App>
				</Switch>
			</BrowserRouter>
		</Provider></LocaleProvider>,
	document.getElementById('root')
)
