import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RequestResetUserPasswordRequest,
  RequestResetUserPasswordResponse
} from '../../typings/password_interface/requestResetUserPassword.interface';

export function requestResetUserPassword({
  email
}: RequestResetUserPasswordRequest): Promise<
  AxiosResponse<RequestResetUserPasswordResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/reset-password/request',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      email
    }
  };

  return axios.request<RequestResetUserPasswordResponse>(config);
}
