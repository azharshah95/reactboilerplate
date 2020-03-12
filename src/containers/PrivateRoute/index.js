import React, {useContext} from 'react';
import { checkAppUser } from '../../config/helpers'
import { Route, Redirect, withRouter } from 'react-router-dom';
import UserContext from '../../context/userContext'

function PrivateRoute({ component: Component, ...rest }) {
  const appUser = useContext(UserContext)
  
  return(
    <Route {...rest} render={(props) => {
      if (checkAppUser(appUser)) {
        return <Component {...props} />
      }
      return <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />
    }}
    />
  );
}

export default withRouter(PrivateRoute)