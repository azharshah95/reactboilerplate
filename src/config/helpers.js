import _ from 'lodash';
import decode from 'jwt-decode'
import Cookies from 'js-cookie'

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

export function parseToken() {
  if (Cookies.get('token') && !_.isEmpty(Cookies.get('token'))) {
    return decode(Cookies.get('token'))
  }
}

export function checkObjectLength(obj) {
  console.log(Object.keys(obj).length);
  
  if(Object.keys(obj).length !== 0){
    return true
  } else {
    return false
  }
}
export function checkAppUser(obj) {
  if(obj !== undefined){
    return true
  } else {
    return false
  }
}