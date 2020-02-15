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

export function fetchPosts(payload) {
  return {
    type: CONSTANTS.POSTS_FETCH,
    payload,
  };
}


export function fetchPostsSuccess(payload) {
  return {
    type: CONSTANTS.POSTS_FETCH_SUCCESS,
    payload,
  };
}

export function fetchPostsFail(error) {
  return {
    type: CONSTANTS.POSTS_FETCH_FAIL,
    error,
  };
}
