/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { POSTS_FETCH } from '../../containers/Posts/constants';
import { fetchPostsFail, fetchPostsSuccess } from '../../containers/Posts/actions';

import API from '../../services/api';
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

export function* getPosts(action) {
  // const category_id = yield select(makeSelectCategoryId());
  const response = yield call(api.getPosts, action.payload);
  
  if (response.ok) {
    const posts = response.data;

    // do data conversion here if needed
    // yield put({ type: PRODUCT_DETAIL_FETCH, productDetail });
    yield put(fetchPostsSuccess(posts));
  } else {
    const { data, status } = response;
    // yield put({ type: CONSTANTS.PROJECT_LIST_FETCH_FAIL });
    yield put(fetchPostsFail({ data, status }));
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
  yield takeLatest(POSTS_FETCH, getPosts);
}
