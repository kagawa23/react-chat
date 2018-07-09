import React, { Component } from 'react';

const imoocForm = function(Comp) {
    class WrapComp extends Component {
        constructor(props) {
            super(props);
            this.state = {  };
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(key,value){
            console.log(key,value);
            this.setState({ [key]: value  });
        }

        componentDidMount() {
            console.log('component did mount');
        }

        render() { 
            return ( <Comp {...this.props} state={this.state} handleChange={this.handleChange}/> )
        }
    }
    return WrapComp;     
}

export default imoocForm;
