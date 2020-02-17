import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import reducer from '../Login/reducer';
import { fetchLoginUser, fetchLoginCurrentUser } from '../Login/actions';
import { makeSelectLoginCurrentUser, makeSelectLoginUser, makeSelectLoading, makeSelectError } from '../../containers/Login/selectors';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  comp

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.loginUserData.success) {
      document.cookie = `token=${nextProps.loginUserData.token}`;
      this.props.currentUser()
      // this.props.currentUser()
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log('PREV PROPS', prevProps);
  //   console.log('PROPS', this.props);
  //   if (this.props.loginCurrentUser == prevProps.loginCurrentUser) {
  //   //   console.log(true);
      
  //     this.props.currentUser()
  //   }
  // }

  render(){
    // if (Cookies.get('token')) {
    //   return(
    //     <Redirect
    //       to='/'
    //     />
    //   )
    // }
    // console.log(this.props);
    
    const { error, loading, loginUserData } = this.props;
    if (loading) {
      return(
        <h3>Logging in ...</h3>
      )
    }
    if (loginUserData.success) {
      return(
        <h3>Login Successful</h3>
      )
      // return(
      //   <Redirect
      //     to='/'
      //   />
      // )
    }
    return(
      <div>
        <h2>
          Login Below
        </h2>
        <form>
          {
            error ? <p style={{color:'red'}}>{error.data.email}</p> : null
          }
          <label htmlFor="email_login">Email Address: </label>
          <input
              id="email_login"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={this.state.email}
              onChange={this.onChange}
          />
          <br />
          <br />
          {
            error ? <p style={{color:'red'}}>{error.data.password}</p> : null
          }
          <label htmlFor="password_login">Password: </label>
          <input
              id="password_login"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
          />
          <br />
          <br />
          <button id="btn_login" onClick={this.onSubmitForm}>Login</button>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loginUser: (data) => dispatch(fetchLoginUser(data)),
    currentUser: () => dispatch(fetchLoginCurrentUser()),
  };
}

const mapStateToProps = createStructuredSelector({
  loginCurrentUser: makeSelectLoginCurrentUser(),
  loginUserData: makeSelectLoginUser(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'loginUser', reducer });
const withSaga = injectSaga({ key: 'loginUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Login);