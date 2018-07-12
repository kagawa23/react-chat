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
            return {...state, chatmsg:action.payload,users:action.users, unread: action.payload.filter(v=>!v.read && v.to === action.userId ).length }
        case MSG_RECV:
            const n = (action.userId === action.payload.to)? 1: 0;
            return {...state, chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n};
        case MSG_READ:
            return state;
        default:
            return state;
    }
}

function chatList(data,users, userId){
    return {type:MSG_LIST,payload:data,users, userId};
}

function chatRecv(data, userId) {
    return {type:MSG_RECV,payload:data, userId}
}

export function sendMsg(from,to, msg){
    return (dispatch) => {
        socket.emit('clientmsg',{from,to,msg})
    }
}

export function recvMsg(){
    return (dispatch, getState) => {
        socket.on('servermsg',(data)=>{
            const {user:{ _id }} = getState();
            dispatch(chatRecv(data, _id));
        })
    }
}

export function getChatList(){
    return (dispatch, getState) => {
        axios.get('/user/chatlist').then(({data:resp})=>{
            if(resp.code === 0){
                const {user:{ _id }} = getState();
               // console.log(user);
                dispatch(chatList(resp.data,resp.users,_id));
            }
        })
    }
}

export function getChatId(id1,id2){
    return [id1,id2].sort().join('_');
}