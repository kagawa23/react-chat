import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getUserlist } from '../../redux/chatuser.redux';
import UserCards from '../userCards/userCards';

@connect(state=>state.chatuser,{getUserlist})
class Genius extends Component {
    componentDidMount(){
        this.props.getUserlist('genius');
    }
    render() { 
        const { userlist:data } = this.props;
        const array = data.filter((d)=>d.avatar);
        return (<UserCards userlist={array}/>)
    }
}
 
export default Genius;