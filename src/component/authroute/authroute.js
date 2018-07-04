import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login','/register'];
        const pathname =  this.props.location.pathname 
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        axios.get('/user/info').then(resp => {
            if(resp.status === 200){
                console.log(resp.data);
                const { code } = resp.data;
                if(code == 0){
                    //登陆成功
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