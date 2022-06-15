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
    baseURL: 'https://thesocialcomment-backend-test.herokuapp.com',
    url: '/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { email, password }
  };
  return axios.request<LoginResponseData>(config);
}
