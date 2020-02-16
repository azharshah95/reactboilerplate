/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: CONSTANTS.YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import * as CONSTANTS from './constants';

export function fetchRegisterUser(payload) {
  return {
    type: CONSTANTS.REGISTER_REQUEST,
    payload,
  };
}


export function fetchRegisterUserSuccess(payload) {
  return {
    type: CONSTANTS.REGISTER_REQUEST_SUCCESS,
    payload,
  };
}

export function fetchRegisterUserFail(error) {
  return {
    type: CONSTANTS.REGISTER_REQUEST_FAIL,
    error,
  };
}
