import React, { Component } from 'react'
import { Input, Button, Form, Header, Message } from 'semantic-ui-react'
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
        <Form success>
          <Message
            success
            header='User Registration Successful'
          />
        </Form>
      )
    }
    return(
      <div>
        <Header>
          Register Below
        </Header>
        <Form error>
          { error ? <Message  size='mini' color='red' error content={error.data.name} /> : null }
          <Form.Field>
            <Input
              id="name"
              type="name"
              name="name"
              icon='user circle'
              iconPosition='left'
              value={this.state.name}
              placeholder="Name"
              onChange={this.onChange}
            />
          </Form.Field>
          { error ? <Message  size='mini' color='red' error content={error.data.email} /> : null }
          <Form.Field>
            <Input
              id="email_register"
              type="email"
              name="email"
              icon='mail'
              iconPosition='left'
              value={this.state.email}
              placeholder="Email"
              onChange={this.onChange}
            />
          </Form.Field>
          { error ? <Message  size='mini' color='red' error content={error.data.password} /> : null }
          <Form.Field>
            <Input
              id="password_register"
              type="password"
              name="password"
              icon='key'
              iconPosition='left'
              placeholder="Password"
              onChange={this.onChange}
            />
          </Form.Field>
          { error ? <Message  size='mini' color='red' error content={error.data.password2} /> : null }
          <Form.Field>
            <Input
              id="password2"
              type="password"
              name="password2"
              icon='key'
              iconPosition='left'
              placeholder="Re-type Password"
              onChange={this.onChange}
            />
          </Form.Field>
          { loading ? <Button loading fluid content='Registering' /> : <Button fluid id="btn_register" onClick={this.onSubmitData}>Register</Button> }
        </Form>
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