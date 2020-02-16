import React, { Component } from 'react'
import Login from '../Login';
import Register from '../Register';

class Auth extends Component {

  render(){
    return(
      <div>
        <Login />
        <hr />
        <Register />
      </div>
    );
  }
}

export default Auth;