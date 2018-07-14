import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from '../../../node_modules/antd-mobile';

@connect(state=>state)
class Msg extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    getLastItem(items){
       return items[items.length-1];
    }
    
    render() { 
        console.log(this.props);
        const Item = List.Item;
        const Brief = Item.Brief;
        const { chat:{chatmsg,users},  user:{_id:userId} } = this.props;
        if(chatmsg.length === 0) return <h1>消息列表</h1>;
        let chatDict  = {};
        let unreadList = {};
        chatmsg.forEach(chat => {
            if(chat.to === userId){
                const targetId = chat.from;
                chatDict[targetId] = chatDict[targetId]?
                           [...chatDict[targetId],chat]:[chat];
                if(!chat.read){
                    unreadList[targetId] = unreadList[targetId]?
                                unreadList[targetId]+1:1;
                }
            }
        });
        console.log(chatDict);

        const sortUserList = Object.keys(chatDict).sort((a,b) =>{
            const charAItem = this.getLastItem(chatDict[a]);
            const charBItem = this.getLastItem(chatDict[b]);
            return  charBItem.createTime - charAItem.createTime;
        });
        
        return ( <div>
            <List>
                {
                    sortUserList.map(id => { 
                        const item = this.getLastItem(chatDict[id]); 
                        console.log(item); 
                        return (
                            <Item 
                                multipleLine
                                onClick={()=>this.props.history.push(`/chat/${id}`)}
                                thumb={require(`../images/avatar/${users[id].avatar}.png`)}
                                extra={<Badge text={unreadList[id]}></Badge>}>
                                {item.content} <Brief>{users[id].user}</Brief>
                            </Item>
                    )})
                }
            </List>
        </div> );
    }
}
 
export default Msg;