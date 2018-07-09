import React from 'react';
import Logo from '../../component/logo/logo'
import { Button, InputItem, WhiteSpace,WingBlank } from 'antd-mobile';
import { loginUser } from '../../redux/user.redux';
import { connect } from "react-redux";
import {  Redirect } from 'react-router-dom'
import imoocForm from '../../component/imoocForm/imoocForm';

@imoocForm
@connect(state=>state.user, {loginUser})
class Login extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     user:"",
        //     pwd:"",
        //     errMsg:"",
        //     redirectTo:""
        // }
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    register(){
        this.props.history.push('/register');
    }
    // handleChange(key,value) {
    //     this.setState({
    //         [key]:value
    //     })
    // }
    login(){
        this.props.loginUser(this.props.state);
    }
    render() {
        const {errMsg,redirectTo} = this.props;
        return (
            <div>
                <Logo/>
                <h1>登陆页</h1> 
                {errMsg?<p className="error-msg">{errMsg}</p>:null}
                {redirectTo && redirectTo !=='/login'?<Redirect to={redirectTo}/>:null} 
                <WingBlank>
                    <InputItem onChange={(v) => this.props.handleChange("user",v)} >用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem onChange={(v) => this.props.handleChange("pwd",v)}>密码:</InputItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登陆</Button>
                    <WhiteSpace/>

                    <Button type="primary" onClick={this.register}>注册</Button>

                    <WhiteSpace/>
                </WingBlank>
            </div>
        );
    }
}

export default Login;