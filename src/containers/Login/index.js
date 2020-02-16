import React, { Component } from 'react'

class Login extends Component {

  render(){
    return(
      <div>
        <h2>
          Login Below
        </h2>
        <label htmlFor="email_login">Email Address: </label>
        <input
            id="email_login"
            type="email_login"
            name="email_login"
        />
        <br />
        <br />
        <label htmlFor="password_login">Password: </label>
        <input
            id="password_login"
            type="password_login"
            name="password_login"
        />
        <br />
        <br />
        <button id="btn_login">Login</button>
      </div>
    );
  }
}

export default Login;