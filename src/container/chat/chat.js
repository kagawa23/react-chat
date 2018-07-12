import React, { Component } from 'react';
import {List , InputItem, NavBar,Icon, Grid} from 'antd-mobile';
import { getChatList,sendMsg,recvMsg, getChatId } from '../../redux/chat.redux';
import { connect } from 'react-redux';
import '../../index.css'
const Item = List.Item;

@connect(state=>state,{getChatList,sendMsg,recvMsg})
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { data:'',dataList:[] }
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        const {chat:{ users}} = this.props
        if(users.length === 0) {
            this.props.getChatList();
            this.props.recvMsg();
        }
    }

    onSubmit(){
        const {data:content} = this.state;
        const {user:{_id:from}, match:{params:{user:to}}} = this.props;
        this.props.sendMsg(from,to,content);
        this.setState({ data: '' });
    }

    render() { 
        const {params:{user:userId}} = this.props.match;
        const {user:{_id},chat:{ chatmsg:rawmsg,users}} = this.props
        const chatmsg = rawmsg.filter(v=> v.chatId === getChatId(userId,_id))
        const emojiList = "😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾"
        .split(' ').map(v=>({text:v}));


        return ( <div className="chat-container">
                <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.props.history.goBack()}}
                >{users[userId] && users[userId].user}</NavBar>
                <List>

                {    chatmsg.map((v)=>{
                        const user = users[v.from]
                        const avatar = require(`../../component/images/avatar/${user.avatar}.png`)
                        return (v.from === userId?<Item className="chat-right" align="middle" thumb={avatar} multipleLine>
                                       对方:{v.content}</Item>:<Item className="chat-left"  align="middle" thumb={avatar} multipleLine>
                                        我:{v.content}</Item>)
                    })}
                </List>
            <List>
            <InputItem
            clear
            placeholder="请输入"
            value={this.state.data}
            onChange={(v)=>this.setState({ data: v })}
            extra={<span onClick={this.onSubmit}>提交</span>}
          ></InputItem>
            </List>
            <div>
                {this.state.dataList.map((v)=>
                    <p key={v}>{v}</p>
                )}
            </div>

                <Grid data={emojiList} columnNum={8} isCarousel onClick={_el => {this.setState({ data: this.state.data + _el.text });}} carouselMaxRow={5}/>

        </div> )
    }
}
 
export default Chat;