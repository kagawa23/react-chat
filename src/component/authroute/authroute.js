import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(state => state.user,{ loadData})
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login','/register'];
        const pathname =  this.props.location.pathname 
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        axios.get('/user/info').then(resp => {
            if(resp.status === 200){
                console.log(resp.data);
                const { code,data } = resp.data;
                if(code === 0){
                    //登陆成功
                    this.props.loadData(data)
                }else{
                    this.props.history.push('/login'); 
                }
            }       
        })
    }
    
    render() {
        return null;
    }
}

export default AuthRoute;