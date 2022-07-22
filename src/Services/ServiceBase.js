import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  // baseURL: 'https://api.realworld.io/api/',
  // baseURL: 'https://blog.kata.academyapi/',
  baseURL: 'https://blog.kata.academy/api/',
  // baseURL: 'https://kata.academy:8021/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${Cookies.get('token') || null}`,
  },
});
export default instance;
