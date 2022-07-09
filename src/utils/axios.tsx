import axios from 'axios';

axios.defaults.baseURL = 'https://thesocialcomment-backend-test.herokuapp.com';

const instance = axios.create({
  baseURL: 'https://thesocialcomment-backend-test.herokuapp.com'
});
export default instance;
