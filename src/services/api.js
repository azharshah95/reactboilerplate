import apisauce from 'apisauce';


const create = () => {

  const api = apisauce.create({
    
  });

  const getPosts = () => api.get('https://jsonplaceholder.typicode.com/posts');

  return {
    getPosts
  }
};

export default {
  create,
};