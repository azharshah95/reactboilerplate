/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from '../../containers/Login/constants';
import { fetchLoginUserFail, fetchLoginUserSuccess } from '../../containers/Login/actions';
import { LOGIN_CURRENT_REQUEST } from '../../containers/Login/constants';
import { fetchLoginCurrentUserFail, fetchLoginCurrentUserSuccess } from '../../containers/Login/actions';

import API from '../../services/api';
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

export function* getLoginUser(action) {
  const response = yield call(api.loginUser, action.payload);
  
  if (response.ok) {
    const loginUserData = response.data;
    yield put(fetchLoginUserSuccess(loginUserData));
  } else {
    const { data, status } = response;
    yield put(fetchLoginUserFail({ data, status }));
  }
}

export function* getLoginCurrentUser(action) {
  const response = yield call(api.loginCurrentUser, action.payload);
  if (response.ok) {
    const loginCurrentUser = response.data;
    yield put(fetchLoginCurrentUserSuccess(loginCurrentUser));
  } else {
    const { data, status } = response;
    yield put(fetchLoginCurrentUserFail({ data, status }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN_REQUEST, getLoginUser);
  yield takeLatest(LOGIN_CURRENT_REQUEST, getLoginCurrentUser);
}
