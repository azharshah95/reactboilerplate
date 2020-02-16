import apisauce from 'apisauce';
import * as KEY from '../config/keys';

const create = () => {

  const api = apisauce.create({
    baseURL: KEY.localBaseUrl
  });

  const getPosts = () => api.get('https://jsonplaceholder.typicode.com/posts');
  const registerUser = (bodyParams) => api.post('/users/register', bodyParams);

  return {
    getPosts,
    registerUser
  }
};

export default {
  create,
};