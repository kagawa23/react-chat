import React, { Component } from 'react';
import { 
	BrowserRouter, 
	Route, 
	Redirect,
    Switch,
    withRouter
} from 'react-router-dom';
import NavLinkBar from '../navbar/navbar'
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile'
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../me/me';
import Msg from '../msg/msg';
import { getChatList,sendMsg,recvMsg, getChatId } from '../../redux/chat.redux';



// function Msg(){
// 	return <h2>消息列表页面</h2>
// }
// function User(){
// 	return <h2>个人中心页面</h2>
// }
// function Boss(){
// 	return <h2>Boss页面</h2>
// }

// function Genius(){
//     return <h2>牛人页面</h2>
// }

@connect(state=>state, { getChatList,recvMsg })
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){

        const {chat:{ users}} = this.props
        if(users.length === 0) {
            this.props.getChatList();
            this.props.recvMsg();
        }
        // this.props.getChatList();
        // this.props.recvMsg();
    }
    render() { 
        const { user,chat } = this.props;
        const {pathname} = this.props.location
        const navList = [
            {
                icon: require('../images/navimg/boss.png'),
                select_icon:require('../images/navimg/boss-active.png'),
                title: "Boss列表",
                path: "/genius",
                hide: user.type === "boss",
                component: Boss
            },
            {
                icon: require('../images/navimg/boss.png'),
                select_icon:require('../images/navimg/boss-active.png'),
                title: "牛人列表",
                path: "/boss",
                hide: user.type === "genius",
                component: Genius
            },
            {
                icon: require('../images/navimg/msg.png'),
                select_icon:require('../images/navimg/msg-active.png'),
                title: "消息",
                path: "/message",
                component: Msg,
                badge: chat.unread
            },
            {
                icon: require('../images/navimg/user.png'),
                select_icon:require('../images/navimg/user-active.png'),
                title: "我",
                path: "/me",
                component: User
            }

        ]
        return ( 
        <div className="dashborad">
            <NavBar mode="dark">{navList.find(v=>v.path==pathname).title}</NavBar>
            <div className="container">
            <Switch>
            { navList.map((nav) =>(
                    <Route  key={nav.path} path={nav.path} component={nav.component}></Route> 
                ))}
            </Switch>
			</div>
            <NavLinkBar data={navList}></NavLinkBar>
        </div> )
    }
}
 
export default Dashboard;