import React from 'react';
import { Card, WingBlank } from 'antd-mobile'
import { withRouter} from 'react-router-dom';

@withRouter
class UserCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  handleClick({user}) {
    this.props.history.push(`/chat/${user}`);
  }
  render() { 
    const {userlist:array} = this.props;
    return ( <WingBlank>
      { array.map((d) =>(
         <Card onClick={()=>this.handleClick(d)}>
         <Card.Header
           title={d.company}
           thumb={require(`../images/avatar/${d.avatar}.png`)}
           extra={<span>{d.money}</span>}
         />
         <Card.Body>
           <div>{d.describe.split('\n').map(e=>(<div key={e}>{e}</div>))}</div>
         </Card.Body>
       </Card>  
      )) }
</WingBlank> )
  }
}

export default UserCards;