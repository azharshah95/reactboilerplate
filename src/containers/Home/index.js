import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render(){
    return(
      <div>
        <h2>
          This is Home page.
        </h2>
        <Link to='/posts'>Posts</Link>
      </div>
    );
  }
}

export default Home;