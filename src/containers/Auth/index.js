import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'
import Login from '../Login';
import Register from '../Register';

class Auth extends Component {

  render(){
    return(
      <div style={{marginTop: '50px'}}>
        <Login />
        <Divider />
        <Register />
      </div>
    );
  }
}

export default Auth;