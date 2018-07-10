import React, { Component } from 'react';
import io from 'socket.io-client';
import {List , InputItem} from 'antd-mobile';

const socket = io('ws://localhost:9093');


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { data:'',dataList:[] }
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        socket.on('servermsg',(data) =>{
            console.log(data);
            const { dataList } = this.state;
            this.setState({ dataList: [...dataList,data]  });
        });
    }

    onSubmit(){
        const {data} = this.state;
        socket.emit('clientmsg',data);
        this.setState({ data: '' });
    }

    render() { 
        const {params:{user}} = this.props.match;
        return ( <div>
            <h1>{`Chat with:${user}`}</h1>
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
        </div> )
    }
}
 
export default Chat;