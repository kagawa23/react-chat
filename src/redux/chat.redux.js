const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';


const initState = {
    chatmsg:'',
    unread:0,
}

export function Chat(state=initState,action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg:action.payload, unread: action.payload.filter(v=>!v.read).length }
        case MSG_RECV:
            break;
        case MSG_READ:
            break;
        default:
            break;
    }
}