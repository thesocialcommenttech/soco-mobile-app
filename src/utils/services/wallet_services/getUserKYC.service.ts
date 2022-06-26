import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetUserKYCResponse } from '../../typings/wallet_interfaces/getUserKYC.interface';

export function getUserKYC(): Promise<AxiosResponse<GetUserKYCResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/kyc',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetUserKYCResponse>(config);
}
