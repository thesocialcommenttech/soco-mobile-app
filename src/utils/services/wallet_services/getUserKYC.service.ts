import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetUserKYCResponse } from '../../typings/wallet_interfaces/getUserKYC.interface';

export function getUserKYC() {
  const config: AxiosRequestConfig = {
    url: 'user/kyc',
    method: 'GET'
  };
  return axios.request<GetUserKYCResponse>(config);
}
