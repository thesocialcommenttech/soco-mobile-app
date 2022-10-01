import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetUserReferralDataResponse } from '../../typings/user-referral-data_interface/getUserReferralData.interface';

export function getUserReferralData() {
  const config: AxiosRequestConfig = {
    url: 'user/profile/referral',
    method: 'GET'
  };
  return axios.request<GetUserReferralDataResponse>(config);
}
