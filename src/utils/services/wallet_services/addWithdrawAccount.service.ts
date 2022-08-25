import axios, { AxiosRequestConfig } from 'axios';
import {
  AddWithdrawAccountResponse,
  WithdrawDestinationData,
  WithdrawDestinationType
} from '../../typings/wallet_interfaces/addWithdrawAccount';

export function addWithdrawAccount(
  destinationType: WithdrawDestinationType,
  data: WithdrawDestinationData
) {
  const config: AxiosRequestConfig = {
    url: 'user/wallet/add_withdraw_destination',
    method: 'POST',
    data: {
      destination_type: destinationType,
      destination_details: data
    }
  };
  return axios.request<AddWithdrawAccountResponse>(config);
}
