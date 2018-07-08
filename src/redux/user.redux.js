import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERR_MSG = 'ERR_MSG';
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const LOG_OUT = "LOG_OUT";

const initState = {
    type:'',
    user:'',
    pwd:'',
    errMsg:'',
    redirectTo:''
}

export function user(state = initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,...action.data, errMsg:'',redirectTo:getRedirectPath(action.data.type, action.data.avatar)};
        case ERR_MSG:
            return {...state, errMsg:action.errMsg};
        case LOAD_DATA:
            return {...state,...action.data}
        case LOG_OUT:
            return {...initState,redirectTo:'/login'};
        default:
            return state;
    }
}

function registerFail(errmsg){
    return {type:ERR_MSG, errMsg:errmsg};
}

function authSuccess(data){
    return {type:AUTH_SUCCESS, data};
}


export function logoutSubmit(){
    return {type:LOG_OUT};
}

export function loadData(data){
    return { type:LOAD_DATA,data}
}

export function loginUser({user,pwd}){
    if( !user || !pwd){
        return registerFail('用户名，密码不为空');
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd})
        .then(resp => {
            const data = resp.data;
            if( data.code === 0)
            return dispatch(authSuccess(data.data));
            else
            return dispatch(registerFail(data.msg));
        }).catch(err =>{
            console.log(err);
            return dispatch(registerFail('服务内部错误'));
        })
    }
}

export function registerUser({user, pwd, repeatPwd, type}){
    if(!user || !pwd || !repeatPwd || !type){
        return registerFail('用户名，密码不为空');
    }
    if(pwd !== repeatPwd){
        return registerFail('密码输入不一致');
    }
    return dispatch => {
        axios.post('/user/register',{user,pwd,type})
        .then(resp =>{
            const data = resp.data;
            if( data.code === 0)
            return dispatch(authSuccess(data.data));
            else
            return dispatch(registerFail(data.msg));
        }).catch((err) =>{
            console.log(err);
            return dispatch(registerFail('服务内部错误'));
        })
    }
}

export function updateUser({avatar,title,company,money,describe}){
    return dispatch => {
        axios.post('/user/update',{avatar,title,company,money,describe})
        .then(resp =>{
            const data = resp.data;
            if( data.code === 0)
            return dispatch(authSuccess(data.data));
            else
            return dispatch(registerFail(data));
        }).catch((err) =>{
            console.log(err);
            return dispatch(registerFail('服务内部错误'));
        })
    }
}