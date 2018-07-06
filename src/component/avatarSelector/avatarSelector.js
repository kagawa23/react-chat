import React, { Component } from 'react';
import avatarList from '../images/avatar';
import { Grid } from 'antd-mobile'

class AvatarSelector extends Component {
    state = {}
    render() { 
        return ( <div>
            {!this.props.avatar?<div className="sub-title">请选择头像 </div>:
            <div className="sub-title">已经选择了头像<img src={this.state.icon} style={{width:20}} alt="selected-avtar"/>
             </div>}
            <Grid data={avatarList} activeStyle={false} onClick={(el) => {
                this.setState({ icon: el.icon  });
                this.props.changeAvatar('avatar',el.text);
                }}/>
        </div> )
    }
}
 
export default AvatarSelector;