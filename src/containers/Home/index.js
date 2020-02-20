import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {

  onLogout = () => {
    localStorage.removeItem('user');  // remove user
    document.cookie = `token=null`  // delete token
    window.location.reload();
  }

  render(){
    return(
      <div>
        <h2>
          This is Home page.
        </h2>
        <Link to='/posts'>Posts</Link>
        <br />
        {localStorage.getItem('user') ? <Link to='/' onClick={this.onLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
      </div>
    );
  }
}

export default Home;