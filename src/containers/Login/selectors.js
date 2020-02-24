/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectLoginUser = (state) => state.loginUser;


const makeSelectLoading = () => createSelector(
  selectLoginUser,
  (loginUserState) => loginUserState.get('loading')
);

const makeSelectError = () => createSelector(
  selectLoginUser,
  (loginUserState) => loginUserState.get('error')
);

const makeSelectLoginUser = () => createSelector(
  selectLoginUser,
  (loginUserState) => loginUserState.get('loginUserData')
);
const makeSelectLoginCurrentUser = () => createSelector(
  selectLoginUser,
  (loginUserState) => loginUserState.get('loginCurrentUserData')
);


export {
  selectLoginUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLoginUser,
  makeSelectLoginCurrentUser,
};
