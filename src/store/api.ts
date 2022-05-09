import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://thawing-tor-58868.herokuapp.com',
});
