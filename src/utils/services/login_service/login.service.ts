import axios, { AxiosRequestConfig } from 'axios';
import {
  LoginRequestData,
  LoginResponseData
} from '../../typings/login_interface/login.interface';

export function login({ email, password }: LoginRequestData) {
  const config: AxiosRequestConfig = {
    url: '/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { email, password }
  };
  return axios.request<LoginResponseData>(config);
}
