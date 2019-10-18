import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUserLoginInfo } from '../login/actions'

class App extends Component {
	constructor(props) {
		super(props)
		// console.log("---------")
	}
	componentWillMount() {
		window.myHistory = this.props.history;
		//公共的业务请求在这里发起，
		//比如每个页面第一次访问都要获取的登录信息
		// this.props.actions.getUserLoginInfo();
	}
	render() {
		return <div>
			{this.props.children}
		</div>
	}
}

App.propTypes = {
	children: PropTypes.element
}

const mapStateToProps = (state) => ({
	loginReducer: state.loginReducer,
	routing: state.routing.locationBeforeTransitions
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		getUserLoginInfo
	}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
