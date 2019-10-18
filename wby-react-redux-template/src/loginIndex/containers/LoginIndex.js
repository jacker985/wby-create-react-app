import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./loginSuccess.less";
const icon = require("../images/control.svg");

class LoginIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="loginSuccessContainer">
				<div className="loginSuccessWrap">
					<img src={icon} alt="" className="successIcon" />
					<h1>登录成功</h1>
				</div>
			</div>
		);
	}
}

LoginIndex.propTypes = {
	actions: PropTypes.shape({})
};

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({}, dispatch)
});

export default connect(
	mapStateToProps, //redux和react连接起来
	mapDispatchToProps
)(LoginIndex);
