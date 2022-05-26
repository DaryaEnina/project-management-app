import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://safe-fortress-13730.herokuapp.com',
});
