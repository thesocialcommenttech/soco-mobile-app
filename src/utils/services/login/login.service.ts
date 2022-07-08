import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  LoginRequestData,
  LoginResponseData
} from '../../typings/login_interfaces/login.interfce';

export function login({
  email,
  password
}: LoginRequestData): Promise<AxiosResponse<LoginResponseData>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { email, password }
  };
  return axios.request<LoginResponseData>(config);
}
