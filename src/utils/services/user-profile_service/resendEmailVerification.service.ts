import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResendEmailVerificationResponse } from '../../typings/user-profile_interface/resendEmailVerification.interface';

export function resendEmailVerification(email: string) {
  const config: AxiosRequestConfig = {
    url: `user/email-verification/request/${email}`,
    method: 'GET'
  };

  return axios.request<ResendEmailVerificationResponse>(config);
}
