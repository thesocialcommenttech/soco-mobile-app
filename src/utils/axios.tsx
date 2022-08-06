import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://thesocialcomment-backend-test.herokuapp.com'
});
export default instance;
