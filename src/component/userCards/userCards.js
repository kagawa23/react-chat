import React from 'react';
import { Card, WingBlank } from 'antd-mobile'

const UserCards = ({userlist:array}) => {
    return ( <WingBlank>
        { array.map((d) =>(
           <Card>
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
 
export default UserCards;