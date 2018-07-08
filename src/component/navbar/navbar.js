import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLinkTab extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {data,location:{pathname}} = this.props;
        const navList = this.props.data.filter(v=>!v.hide)

        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                {
                    navList.map(d => {
                        return (
                            <TabBar.Item
                                title={d.title}
                                key={d.title}
                                icon={{ uri: d.icon}}
                                selectedIcon={{ uri: d.select_icon}}
                                selected={ pathname === d.path}
                                onPress={() => {
                                    this.props.history.push(d.path)
                                }}
                            />)
                             })
                             
                        }
            </TabBar>)
            }
        }
        
export default NavLinkTab;