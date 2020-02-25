import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import Auth from '../Auth';
import Posts from '../Posts';
import Home from '../Home';
import NavBar from '../../components/NavBar';
import UserContext from '../../context/userContext';

class App extends Component {
  state = {
    appUser: {}
  }

  componentDidMount(){
    const appUser = JSON.parse(localStorage.getItem('user'));
    this.setState({ appUser })
  }
  
  render(){  
    return (
      <UserContext.Provider value={this.state.appUser}>
          <div>
            <Router>
              <div style={{ marginTop: '50px'}}>
                <NavBar/>
                <Container>
                  <Switch>
                    <Route exact path='/login' component={Auth} />
                    <Route exact path='/posts' component={Posts} />
                    <Route exact path='/' component={Home} />
                  </Switch>
                </Container>
              </div>
            </Router>
          </div>
        </UserContext.Provider>
    );
  }
}

export default App;
