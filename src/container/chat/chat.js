import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        const socket = io('ws://localhost:9093');
    }
    render() { 
        const {params:{user}} = this.props.match;
        return ( <div>
            <h1>{`Chat with:${user}`}</h1>
        </div> )
    }
}
 
export default Chat;