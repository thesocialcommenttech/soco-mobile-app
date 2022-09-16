import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  DeleteWithdrawAccountResponse,
  GetWalletResponse,
  GetWalletTransactionsResponse,
  UpdateWithdrawAccountResponse,
  WithdrawDestination,
  WithdrawWalletMoneyResponse
} from '../../typings/wallet_interfaces/getWallet.interface';

export function getWallet(): Promise<AxiosResponse<GetWalletResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/wallet/wallet',
    method: 'GET'
  };
  return axios.request<GetWalletResponse>(config);
}

export function getWalletTransactions() {
  const config: AxiosRequestConfig = {
    url: '/user/wallet/transactions',
    method: 'GET'
  };
  return axios.request<GetWalletTransactionsResponse>(config);
}

export function deleteWithdrawDestination(
  destinationID: WithdrawDestination['_id']
) {
  const config: AxiosRequestConfig = {
    url: '/user/wallet/delete_withdraw_destination',
    method: 'POST',
    data: { destination_id: destinationID }
  };
  return axios.request<DeleteWithdrawAccountResponse>(config);
}

export function withdrawFromWallet(amount: number) {
  const config: AxiosRequestConfig = {
    url: '/user/wallet/debit_amount',
    method: 'POST',
    data: { amount }
  };
  return axios.request<WithdrawWalletMoneyResponse>(config);
}

export function setWithdrawAccountAsDefault(
  destinationID: WithdrawDestination['_id']
) {
  const config: AxiosRequestConfig = {
    url: '/user/wallet/update_withdraw_destination',
    method: 'POST',
    data: { destination_id: destinationID }
  };
  return axios.request<UpdateWithdrawAccountResponse>(config);
}
