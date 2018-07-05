import React, { Component } from 'react';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import { NavBar,List,InputItem,TextareaItem } from 'antd-mobile';

class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.onChange = this.onChange.bind(this);
    }
    onChange(key,value){
        this.setState({ [key] : value });
    }
    render() { 
        return ( <div>
    <NavBar
      mode="dark"
    >BOSS完善信息页面</NavBar>
            <AvatarSelector/>
            <List>
            <InputItem
            onChange={(v)=>this.onChange('title',v)}
          >招聘职位</InputItem>  
            <InputItem
            onChange={(v)=>this.onChange('company',v)}
          >公司名称</InputItem>  
            <InputItem
            onChange={(v)=>this.onChange('company',v)}
          >职位薪资</InputItem>
        <TextareaItem
            title="职位需求"
            autoHeight
            labelNumber={3}
          />   
            </List>
        </div> )
    }
}
 
export default BossInfo;