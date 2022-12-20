import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestResetUserPasswordResponse } from '../../typings/password_interface/requestResetUserPassword.interface';

export function requestResetUserPassword(email: string) {
  const config: AxiosRequestConfig = {
    url: 'user/reset-password/request',
    method: 'POST',
    data: { email }
  };

  return axios.request<RequestResetUserPasswordResponse>(config);
}
