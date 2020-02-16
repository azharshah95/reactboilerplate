import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from '../Auth';
import Posts from '../Posts';
import Home from '../Home';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/login' component={Auth} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
