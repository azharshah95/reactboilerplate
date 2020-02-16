import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from '../Register/reducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { fetchRegisterUser } from '../Register/actions';
import { makeSelectRegisterUser, makeSelectLoading, makeSelectError } from '../../containers/Register/selectors';
import saga from './saga';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      name:'',
      email_register:'',
      password_register:'',
      password2:'',
    };
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmitData = (event) => {
    event.preventDefault();
    const { name, email_register, password_register, password2 } = this.state;
    const postBody = {
      name: name,
      email: email_register,
      password: password_register,
      password2: password2
    };
    this.props.registerUser(postBody);    
  }

  render(){
    const { loading, registerUserData } = this.props;
    if (loading) {
      return(
        <h3>Registering...</h3>
      )
    }
    if (registerUserData.name) {
      return(
        <h3>User Registered Successfully</h3>
      )
    }
    return(
      <div>
        <h2>
          Register Below
        </h2>
        <form>
          <label htmlFor="name">Name: </label>
          <input
              id="name"
              type="name"
              name="name"
              onChange={this.onChange}
          />
          <br />
          <br />
          <label htmlFor="email_register">Email Address: </label>
          <input
              id="email_register"
              type="email_register"
              name="email_register"
              onChange={this.onChange}
          />
          <br />
          <br />
          <label htmlFor="password_register">Password: </label>
          <input
              id="password_register"
              type="password_register"
              name="password_register"
              onChange={this.onChange}
          />
          <br />
          <br />
          <label htmlFor="password2">Retype Password: </label>
          <input
              id="password2"
              type="password2"
              name="password2"
              onChange={this.onChange}
          />
          <br />
          <br />
          <button id="btn_register" onClick={this.onSubmitData}>Register</button>
        </form>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    registerUser: (data) => dispatch(fetchRegisterUser(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  registerUserData: makeSelectRegisterUser(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'registerUser', reducer });
const withSaga = injectSaga({ key: 'registerUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Register);