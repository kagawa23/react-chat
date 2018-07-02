import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERR_MSG = 'ERR_MSG';

const initState = {
    isAuth: false,
    type:'',
    user:'',
    pwd:'',
    errMsg:''
}

export function user(state = initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {...state, errMsg:'',isAuth:true};
        case ERR_MSG:
            return {...state, errMsg:action.errMsg};
        default:
            return state;
    }
}

function registerFail(errmsg){
    return {type:ERR_MSG, errMsg:errmsg};
}

function registerSuccess(data){
    return {type:REGISTER_SUCCESS, data};
}

export function registerUser({user, pwd, repeatPwd, type}){
    if(!user || !pwd || !repeatPwd || !type){
        return registerFail('用户名，密码不为空');
    }
    if(pwd !== repeatPwd){
        return registerFail('密码输入不一致');
    }
    axios.post('/user/register',{user,pwd,type})
    .then(resp =>{
        const data = resp.data;
        return (dispatch)=>dispatch(registerSuccess(data));
    })
}