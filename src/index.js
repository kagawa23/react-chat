import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { 
	BrowserRouter, 
	Route, 
	Redirect,
	Switch
} from 'react-router-dom'
import Chat from './container/chat/chat';

import reducers from './reducer'
import Register from './container/register/register';
import Login from './container/login/login';
import BossInfo from './container/bossInfo/bossInfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import AuthRouter from './component/authroute/authroute';

import './config'
import 'antd-mobile/dist/antd-mobile.css';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))


const Boss = () => {
	return (
		<div>
			Boss页面
		</div>
	);
};

// class Test extends React.Component{
// 	constructor(props) {
// 		super(props)
		
// 	}
// 	render(){
// 		console.log(this.props)
// 		return <h2>测试组件 {this.props.match.params.location}</h2>
// 	}
// }

// 登录
// 	没有登录信息 统一跳转login
// 页面  导航+显示+注销
// 	一营
// 	二营
// 	骑兵连
// router+redux
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRouter/>
				<Switch>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
				<Route path='/geniusinfo' component={GeniusInfo}></Route>
				<Route path='/bossinfo' component={BossInfo}></Route>
				<Route path='/chat/:user' component={Chat}></Route>
				<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
