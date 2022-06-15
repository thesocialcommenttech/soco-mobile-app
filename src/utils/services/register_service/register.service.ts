import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RegisterReqeust,
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
}: RegisterReqeust): Promise<AxiosResponse<RegisterResponse>> {
  const config: AxiosRequestConfig = {
    baseURL: 'https://thesocialcomment-backend-test.herokuapp.com',
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
  return axios.request<RegisterResponse>(config);
}
