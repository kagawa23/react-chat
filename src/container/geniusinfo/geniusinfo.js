import React, { Component } from 'react';
import AvatarSelector from '../../component/avatarSelector/avatarSelector';
import { NavBar,List,InputItem,TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

@connect(state => state.user,{ updateUser })
class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            avatar:'',
            title:'',
            company:'',
            describe:''
         }
         this.onChange = this.onChange.bind(this);
         this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(){
        this.props.updateUser(this.state);
    }

    onChange(key,value){
        this.setState({ [key] : value });
    }
    render() { 
        const { redirectTo,location:{pathname} } = this.props;
        
        return ( <div>
                         {redirectTo && pathname !== redirectTo ?<Redirect to={redirectTo}/>:null}
    <NavBar
      mode="dark"
    >BOSS完善信息页面</NavBar>
            <List>
            <AvatarSelector avatar={this.state.avatar} changeAvatar={this.onChange}/>
            <InputItem
            onChange={(v)=>this.onChange('title',v)}
          >求职岗位</InputItem>  
        <TextareaItem
            title="个人简历"
            autoHeight
            labelNumber={3}
            onChange={(v)=>this.onChange('describe',v)}
          />   
            </List>
        <Button type="primary" onClick={this.handleUpdate}>保存</Button>
        </div> )
    }
}
 
export default BossInfo;