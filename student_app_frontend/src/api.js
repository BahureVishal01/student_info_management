import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // change to match your API base
});

export default instance;
