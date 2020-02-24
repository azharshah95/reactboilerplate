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
      email:'',
      password:'',
      password2:'',
    };
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmitData = (event) => {
    event.preventDefault();
    // console.log(this.state);
    
    // const { name, email, password, password2 } = this.state;
    // const postBody = {
    //   name: name,
    //   email: email_register,
    //   password: password_register,
    //   password2: password2
    // };
    // this.props.registerUser(postBody);    
    this.props.registerUser(this.state);    
  }

  render(){
    const { error, loading, registerUserData } = this.props;
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
          <p style={{color: "red"}}>
            { error ? error.data.name : null }
          </p>
          <label htmlFor="name">Name*: </label>
          <input
              id="name"
              type="name"
              name="name"
              value={this.state.name}
              placeholder="example"
              onChange={this.onChange}
          />
          <br />
          <p style={{color: "red"}}>
            { error ? error.data.email : null }
          </p>
          <label htmlFor="email">Email Address*: </label>
          <input
              id="email_register"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="you@example.com"
              onChange={this.onChange}
          />
          <br />
          <p style={{color: "red"}}>
            { error ? error.data.password : null }
          </p>
          <label htmlFor="password">Password*: </label>
          <input
              id="password_register"
              type="password"
              name="password"
              onChange={this.onChange}
          />
          <br />
          <p style={{color: "red"}}>
            { error ? error.data.password2 : null }
          </p>
          <label htmlFor="password">Retype Password*: </label>
          <input
              id="password2"
              type="password"
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