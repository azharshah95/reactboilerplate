import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Home extends Component {
  render(){
    return(
      <div>
        <h2>
          This is Home page.
        </h2>
        <ul><Link to='/posts'>Posts</Link></ul>
        <ul><Link to='/profile'>Profile</Link></ul>
      </div>
    );
  }
}

export default withRouter(Home);