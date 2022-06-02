import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetWalletResponse } from '../../typings/wallet_interfaces/getWallet.interface';

export function getWallet(): Promise<AxiosResponse<GetWalletResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/wallet/wallet',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<GetWalletResponse>(config);
}
