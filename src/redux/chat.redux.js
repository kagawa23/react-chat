import axios from 'axios';
import io from 'socket.io-client';

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';
const socket = io('ws://localhost:9093');


const initState = {
    chatmsg:[],
    unread:0,
    users:[]
}

export function chat(state=initState,action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg:action.payload,users:action.users, unread: action.payload.filter(v=>!v.read).length }
        case MSG_RECV:
            return {...state, chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1};
        case MSG_READ:
            return state;
        default:
            return state;
    }
}

function chatList(data,users){
    return {type:MSG_LIST,payload:data,users};
}

function chatRecv(data) {
    return {type:MSG_RECV,payload:data}
}

export function sendMsg(from,to, msg){
    return (dispatch) => {
        socket.emit('clientmsg',{from,to,msg})
    }
}

export function recvMsg(){
    return (dispatch) => {
        socket.on('servermsg',(data)=>{
            dispatch(chatRecv(data));
        })
    }
}

export function getChatList(){
    return (dispatch) => {
        axios.get('/user/chatlist').then(({data:resp})=>{
            if(resp.code === 0){
                dispatch(chatList(resp.data,resp.users));
            }
        })
    }
}