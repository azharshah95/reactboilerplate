import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Input, Button, Form, Header, Message } from 'semantic-ui-react'
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
      user: ''
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
    if (this.props.loginCurrentUser.size !== 0) {
      this.setLocalStorage();
    }
    if (this.props.loginUserData !== prevProps.loginUserData) {
      this.getCurrentUser();
    }
  }

  setLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify(this.props.loginCurrentUser));
  }

  setCookie = () => {
    document.cookie = `token=${this.props.loginUserData.token}`;
  }

  getCurrentUser = () => {
    this.props.currentUser();
  }

  render(){
    const { error, loading, loginUserData, loginCurrentUser } = this.props;
    if (loginCurrentUser.name || localStorage.getItem('user')) {
      window.location.replace('/')
    }
    if (loginUserData.success) {
      return(
        <Form success>
          <Message
            success
            header='Login Successful'
          />
        </Form>
      )
    }
    return(
      <div>
        <Header>
          Login Below
        </Header>
        <Form error>
          {
            error ? <Message error content={error.data.email} /> : null
          }
          <Form.Field>
            <label htmlFor="email">Email Address: </label>
            <Input
                id="email_login"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={this.state.email}
                onChange={this.onChange}
                />
          </Form.Field>
          {
            error ? <Message error content={error.data.password} /> : null
          }
          <Form.Field>
            <label htmlFor="password">Password: </label>
            <Input
                id="password_login"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                />
          </Form.Field>
          {
            loading ? <Button loading fluid>Login</Button> : <Button id="btn_login" onClick={this.onSubmitForm} fluid>Login</Button>
          }
        </Form>
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