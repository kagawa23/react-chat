import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List,Result, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux'
import { 
	BrowserRouter, 
	Route, 
	Redirect,
    Switch,
    withRouter
} from 'react-router-dom';
const Item = List.Item;
const Brief = Item.Brief;

@withRouter
@connect(state => state, { logoutSubmit })
class Me extends Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout(){
        const alert = Modal.alert

		alert('注销', '确认退出登录吗???', [
		      { text: '取消', onPress: () => console.log('cancel') },
		      { text: '确认', onPress: () => {
		      	browserCookie.erase('userId')
		      	this.props.logoutSubmit()
		      }}
		    ])
        // console.log('log out');
        // browserCookie.erase('userId');
    }
    render() {
        const { user } = this.props;
        return user.avatar ? (<div>
            {/* {user.redirectTo && user.redirectTo === '/login' ?<Redirect to={user.redirectTo}/>:null}  */}
            <Result
                img={<img src={require(`../images/avatar/${user.avatar}.png`)} style={{ fill: '#F13642' }} />}
                title={user.user}
                message={user.type == 'boss' ? user.company : null}
            />
            <List renderHeader={() => '简介'} >
                <Item
                  multipleLine
                >
                    {user.title}
                    {
                        user.describe
                        .split('\n')
                        .map(v => <Brief>{v}</Brief>)
                    }
                    {user.money?<Brief>薪资:{user.money}</Brief>:null}
                    
                </Item>
            </List>
            <WhiteSpace></WhiteSpace>
            <List>
                <Item onClick={this.logout}>退出登陆</Item>
            </List>
        </div>) : <Redirect to={user.redirectTo}/>
    }
}

export default Me;