import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetUserReferralDataResponse } from '../../typings/user-referral-data_interface/getUserReferralData.interface';

export function getUserReferralData(): Promise<
  AxiosResponse<GetUserReferralDataResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/profile/referral',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetUserReferralDataResponse>(config);
}
