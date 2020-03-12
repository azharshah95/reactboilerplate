import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { parseToken } from '../../config/helpers'
import Auth from '../Auth';
import Posts from '../Posts';
import Profile from '../Profile';
import Home from '../Home';
import NavBar from '../../components/NavBar';
import UserContext from '../../context/userContext';
import PrivateRoute from '../PrivateRoute'

class App extends Component {
  state = {
    appUser: {},
  }

  render(){
    const cookieToken = parseToken() && parseToken()
    return (
      <UserContext.Provider value={cookieToken}>
        <div>
          <Router>
            <NavBar/>
            <Switch>
              <Route exact path='/login' component={Auth} />
              <PrivateRoute path='/posts' component={Posts} />
              <PrivateRoute path='/profile' component={Profile} />
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default withRouter(App);
