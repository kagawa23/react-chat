import React from 'react';
import Logo from '../../component/logo/logo';
import { Button,List, InputItem, WhiteSpace,Radio } from 'antd-mobile';
import { registerUser } from '../../redux/user.redux';
import { connect } from  'react-redux';
import {  Redirect } from 'react-router-dom'
import '../../index.css'

@connect(state=>state.user,{registerUser})
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius',
            user:'',
            pwd:'',
            repeatPwd:'',
            errMsg:'',
            redirectTo:''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key,value) {
        this.setState({
            [key]:value
        })
    }
    handleRegister(){
        this.props.registerUser(this.state);
       // console.log(this.state);
    }
    render() {
        const RadioItem = Radio.RadioItem;
        const { errMsg , redirectTo } =this.props;
        return (
            <div>
                <Logo/>
             <h1>注册页</h1>
             {errMsg?<p className="error-msg">{errMsg}</p>:null}
             {redirectTo?<Redirect to={redirectTo}/>:null}
             <List>
                    <InputItem onChange={v=>this.handleChange('user',v)}>用户名:</InputItem>
                    <InputItem type="password" onChange={v=>this.handleChange('pwd',v)}>密码:</InputItem>
                    <InputItem type="password" onChange={v=>this.handleChange('repeatPwd',v)}>确认密码:</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>

                    <RadioItem checked={this.state.type === 'genius'} onChange={v=>this.handleChange('type','genius')}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'} onChange={v=>this.handleChange('type','boss')}>
                        boss
                    </RadioItem>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>  
            </div>
        );
    }
}

export default Register;