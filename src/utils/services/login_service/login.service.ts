import axios from '../../axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  LoginRequestData,
  LoginResponseData
} from '../../typings/login_interface/login.interface';

export function login({
  email,
  password
}: LoginRequestData): Promise<AxiosResponse<LoginResponseData>> {
  const config: AxiosRequestConfig = {
    url: '/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { email, password }
  };
  return axios
    .request<LoginResponseData>(config)
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
