import apisauce from 'apisauce';
import * as KEY from '../config/keys';
import Cookies from 'js-cookie';

const create = () => {

  const api = apisauce.create({
    baseURL: KEY.API_BASE_URL
  });

  // console.log(Cookies.get('token'));

  const getHeaders = () => {
    let token = Cookies.get('token');
    if (token) {
      return (`Bearer ${token}`);
    }
  }
  
  const getPosts = () => api.get('https://jsonplaceholder.typicode.com/posts');
  const registerUser = (bodyParams) => api.post('/users/register', bodyParams);
  const loginUser = (bodyParams) => api.post('/users/login', bodyParams);
  const loginCurrentUser = () => api.get('/users/current', {},{ headers: {Authorization: getHeaders()} });

  return {
    getPosts,
    registerUser,
    loginUser,
    loginCurrentUser
  }
};

export default {
  create,
};