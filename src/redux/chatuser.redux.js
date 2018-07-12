import axios from 'axios';
const USER_LIST = 'USER_LIST';

const initState = {
    userlist:[],
}

export function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST:
            return {...state,userlist:action.paylaod};
        default:
            return state;
    }
}

function userList(data) {
    return { type:USER_LIST,paylaod:data }
}

export function getUserlist(type){
   return (dispatch) =>{
        axios.get('/user/list?type='+type)
        .then(({data:resp}) => {
            console.log(resp);
            if(resp.status === 0){
                dispatch(userList(resp.data))
            }
        });
   }
}