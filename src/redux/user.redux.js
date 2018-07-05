import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERR_MSG = 'ERR_MSG';
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA = "LOAD_DATA";

const initState = {
    isAuth: false,
    type:'',
    user:'',
    pwd:'',
    errMsg:'',
    redirectTo:''
}

export function user(state = initState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {...state, errMsg:'',isAuth:true,redirectTo:getRedirectPath(action.data.type, action.data.avatar)};
        case REGISTER_SUCCESS:
            return {...state, errMsg:'',isAuth:true,redirectTo:getRedirectPath(action.data.type, action.data.avatar)};
        case ERR_MSG:
            return {...state, errMsg:action.errMsg};
        case LOAD_DATA:
            return {...state,...action.data}
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

function loginSuccess(data){
    return {type:LOGIN_SUCCESS, data};
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
            return dispatch(loginSuccess(data.data));
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
            return dispatch(registerSuccess(data.data));
            else
            return dispatch(registerFail(data));
        }).catch((err) =>{
            console.log(err);
            return dispatch(registerFail('服务内部错误'));
        })
    }
}