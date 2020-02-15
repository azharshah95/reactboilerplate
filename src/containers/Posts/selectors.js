/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectPost = (state) => state.post;


const makeSelectLoading = () => createSelector(
  selectPost,
  (postState) => postState.get('loading')
);

const makeSelectError = () => createSelector(
  selectPost,
  (postState) => postState.get('error')
);

const makeSelectPosts = () => createSelector(
  selectPost,
  (postState) => postState.get('posts')
);


export {
  selectPost,
  makeSelectLoading,
  makeSelectError,
  makeSelectPosts,
};
