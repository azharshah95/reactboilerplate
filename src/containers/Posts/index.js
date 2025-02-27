import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from '../Posts/reducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { fetchPosts } from '../Posts/actions';
import { makeSelectPosts, makeSelectLoading, makeSelectError } from '../../containers/Posts/selectors';
import saga from './saga';
import Pagination from '../../components/Pagination';
import { paginate } from '../../config/helpers';

class Posts extends Component {

  constructor(props){
    super(props);

    this.state={
      currentPage:1,
      pageSize:22
    }
  }

  componentDidMount(){
    this.props.getPosts();
  }

  handlePageChange = (e) => {
    this.setState({currentPage: e})
  }

  render(){
    const { currentPage, pageSize } = this.state;
    const { loading, posts } = this.props;
    const itemsCount = posts.length;
    if (loading) {
      return(
        <h3>Loading ...</h3>
      );
    }
    const postsArr = paginate(posts, currentPage, pageSize)
    return(
      <div>
        <h2>
          This is Posts page.
        </h2>
        <Pagination
          itemsCount={itemsCount}
          pageSize={pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
        {
          postsArr.map((obj, index ) => {
            return(
              <li key={index}>{obj.title}</li>
            )
          })
        }
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts()),
  };
}

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'post', reducer });
const withSaga = injectSaga({ key: 'post', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Posts);