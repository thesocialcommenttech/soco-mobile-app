import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResendEmailVerificationResponse } from '../../typings/user-profile_interface/resendEmailVerification.interface';

export function resendEmailVerification(
  email: string
): Promise<AxiosResponse<ResendEmailVerificationResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/email-verification/request/${email}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<ResendEmailVerificationResponse>(config);
}
