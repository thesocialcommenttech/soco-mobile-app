import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserSubscriptionHistoryResponse } from '../../typings/subscriptions_interfaces/getUserSubscriptionHistory.interface';

export function getUserSubscriptionsHistory(): Promise<
  AxiosResponse<GetUserSubscriptionHistoryResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/subscription',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetUserSubscriptionHistoryResponse>(config);
}
