/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { REGISTER_REQUEST } from '../../containers/Register/constants';
import { fetchRegisterUserFail, fetchRegisterUserSuccess } from '../../containers/Register/actions';

import API from '../../services/api';
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

export function* getRegisterUser(action) {
  const response = yield call(api.registerUser, action.payload);
  
  if (response.ok) {
    const registerUserData = response.data;
    yield put(fetchRegisterUserSuccess(registerUserData));
  } else {
    const { data, status } = response;
    yield put(fetchRegisterUserFail({ data, status }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* postsData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REGISTER_REQUEST, getRegisterUser);
}
