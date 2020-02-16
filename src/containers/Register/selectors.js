/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectRegisterUser = (state) => state.registerUser;


const makeSelectLoading = () => createSelector(
  selectRegisterUser,
  (registerUserState) => registerUserState.get('loading')
);

const makeSelectError = () => createSelector(
  selectRegisterUser,
  (registerUserState) => registerUserState.get('error')
);

const makeSelectRegisterUser = () => createSelector(
  selectRegisterUser,
  (registerUserState) => registerUserState.get('registerUserData')
);


export {
  selectRegisterUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRegisterUser,
};
