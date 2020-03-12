import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'
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
      password: '',
      user: '',
    };
  }
  
  UNSAFE_componentWillMount() {
    const user = localStorage.getItem('user');
    if(user){
      this.setState({ user });
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state)
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginUserData.success) {
      this.setCookie();
    }
  }

  setCookie = () => {
    Cookies.set('token',this.props.loginUserData.token)
  }
  
  render(){
    const { error, loading, loginUserData, loginCurrentUser } = this.props;

    if (loginUserData.success || Cookies.get('token')) {
      if (Cookies.get('token')) {
        return(<Redirect to='/' />)
      }
      if(this.props.location.state !== undefined) {
        if(loginUserData.success) {
          window.location.replace(`${this.props.location.state.referer.pathname}`)
        }
      }
    }
    if (loading) {
      return(
        <h3>Logging in ...</h3>
      )
    }
    if (loginUserData.success) {
      return(
        <h3>Login Successful</h3>
      )
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
          <label htmlFor="email">Email Address: </label>
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
          <label htmlFor="password">Password: </label>
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

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect
)(Login));