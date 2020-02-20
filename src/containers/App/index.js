import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from '../Auth';
import Posts from '../Posts';
import Home from '../Home';
import NavBar from '../../components/NavBar';
import UserLogo from '../../components/UserLogo';
import UserContext from '../../context/userContext';

class App extends Component {
  state = {
    appUser: {}
  }

  // UNSAFE_componentWillMount(){
  //   console.log(localStorage.getItem('user'));
  //   const appUser = JSON.parse(localStorage.getItem('user'));
  //   this.setState({ appUser })
  // }

  componentDidMount(){
    console.log(localStorage.getItem('user'));
    const appUser = JSON.parse(localStorage.getItem('user'));
    this.setState({ appUser })
  }
  // componentWillMount(){
  //   console.log(localStorage);
  // }
  
  render(){  
    return (
      <UserContext.Provider value={this.state.appUser}>
        <div>
          {/* <NavBar/> */}
          <UserLogo/>
          <Router>
            <Switch>
              <Route exact path='/login' component={Auth} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
