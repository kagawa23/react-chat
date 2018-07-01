import React from 'react';
import Logo from '../../component/logo/logo';
import { Button,List, InputItem, WhiteSpace,Radio } from 'antd-mobile';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius',
        }
    }
    
    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                <Logo/>
             <h1>注册页</h1>
             <List>
                    <InputItem>用户名:</InputItem>
                    <InputItem>密码:</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>

                    <RadioItem checked={this.state.type === 'genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.state.type === 'boss'}>
                        boss
                    </RadioItem>
                </List>  
            </div>
        );
    }
}

export default Register;