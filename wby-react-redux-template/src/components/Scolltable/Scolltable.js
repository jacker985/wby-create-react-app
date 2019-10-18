import React from "react";
import "./Scolltable.css";
import { browserInfo } from '../util'
/*
    该组件实现一个底部固定滚动条代替包含组件的滚动条，为了调整滚动条位置的组件
    ,this.props.children是需要滚动的区域的组件
    使用该组件时需要穿一个scrollClassName（带滚动条样式的class的名称）和一个width属性
    width=你的table的scoll的X的值

*/
class Scolltable extends React.Component {
	//滚动条滚动跟随div
	bottomScrollEvent = () => {
		this.hiddenScroll.scrollLeft = this.bottomScroll.scrollLeft
	}
	//div跟随滚动条滚动
	hiddenScrollEvent = () => {
		this.bottomScroll.scrollLeft = this.hiddenScroll.scrollLeft
	}
	//开始监听
	componentDidMount() {
		//需要隐藏滚动条的组件
		let nameTrue = this.props.scrollClassName
		const isTrue = this.props.scrollClassName.indexOf('.') === -1
		if (isTrue) {
			nameTrue = '.' + nameTrue
		}
		this.hiddenScroll = document.querySelector(nameTrue)
		//在低部的滚动条
		this.bottomScroll = document.querySelector('.top')

		//监听滚动条
		this.bottomScroll && this.bottomScroll.addEventListener('scroll', this.bottomScrollEvent)
		//表格绑定div滚动条
		//this.hiddenScroll.addEventListener('scroll', this.hiddenScrollEvent)
	}
	//删除监听
	componentWillUnmount() {
		this.bottomScroll && this.bottomScroll.removeEventListener('scroll', this.bottomScrollEvent)
		//表格解绑绑定div滚动条
		//that.hiddenScroll.removeEventListener('scroll',  this.hiddenScrollEvent)
	}
	render() {
		const { widthScroll = 2078 } = this.props
		const isIos = browserInfo.versions.ios;
		return (
			<div className={isIos ? 'is-ios' : 'is-windows'}>
				{!isIos ? <div className='scrollbar'>
					<div className='top'>
						<div style={{ width: widthScroll, height: 20 }}></div>
					</div>
					{this.props.children}
				</div> : this.props.children}
			</div>
		)
	}


}
export default Scolltable
