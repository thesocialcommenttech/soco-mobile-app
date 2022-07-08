import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RegisterRequest,
  RegisterResponse
} from '../../typings/register_interface/register.interface';

export function register({
  name,
  username,
  email,
  password,
  academic,
  agreement,
  dob,
  gender,
  city,
  pincode,
  referal,
  state
}: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name,
      username,
      email,
      password,
      academic,
      agreement,
      dob,
      gender,
      city,
      pincode,
      referal,
      state
    }
  };
  return axios
    .request<RegisterResponse>(config)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        return error.message;
      }
      // return error;
    });
}
