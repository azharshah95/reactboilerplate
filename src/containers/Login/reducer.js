/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case CONSTANTS.YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import * as CONSTANTS from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  loginUserData: {},
  loginCurrentUserData: {}
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOGIN_REQUEST:
      return state
        .set('loading', true);
    case CONSTANTS.LOGIN_REQUEST_SUCCESS:
      return state
        .set('loginUserData', action.payload)
        .set('error', false)
        .set('loading', false);
    case CONSTANTS.LOGIN_REQUEST_FAIL:
      return state
        .set('error', action.error)
        .set('loading', false);
    // LOGIN CURRENT USER
    case CONSTANTS.LOGIN_CURRENT_REQUEST:
      return state
        .set('loading', true);
    case CONSTANTS.LOGIN_CURRENT_REQUEST_SUCCESS:
      return state
        .set('loginCurrentUserData', action.payload)
        .set('error', false)
        .set('loading', false);
    case CONSTANTS.LOGIN_CURRENT_REQUEST_FAIL:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
