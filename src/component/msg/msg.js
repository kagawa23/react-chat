import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from '../../../node_modules/antd-mobile';

@connect(state=>state)
class Msg extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(this.props);
        const Item = List.Item;
        const Brief = Item.Brief;
        const { chat:{chatmsg,users},  user:{_id:userId} } = this.props;
        if(chatmsg.length === 0) return <h1>消息列表</h1>;
        let chatDict  = {};
        chatmsg.forEach(chat => {
            if(chat.to === userId){
                const targetId = chat.from;
                if(!chatDict[targetId] ||
                    chat.createTime>chatDict[targetId].createTime
                ) {
                    chatDict[targetId] = chat 
                }
            }
        });
        console.log(chatDict);
        return ( <div>
            <List>
                {
                    Object.keys(chatDict).map(id => (
                            <Item multipleLine thumb={require(`../images/avatar/${users[id].avatar}.png`)} extra={users[id].company}>
                                {chatDict[id].content} <Brief>{users[id].user}</Brief>
                            </Item>
                    ))
                }
            </List>
        </div> );
    }
}
 
export default Msg;