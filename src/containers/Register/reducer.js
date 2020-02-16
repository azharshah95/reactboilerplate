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
  registerUserData: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.REGISTER_REQUEST:
      return state
        .set('loading', true);
    case CONSTANTS.REGISTER_REQUEST_SUCCESS:
      return state
        .set('registerUserData', action.payload)
        .set('loading', false);
    case CONSTANTS.REGISTER_REQUEST_FAIL:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
