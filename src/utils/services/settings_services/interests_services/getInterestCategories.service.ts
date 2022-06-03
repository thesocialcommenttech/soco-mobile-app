import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetInterestCategoriesResponse } from '~/src/utils/typings/settings_interfaces/interests_interface/getInterestCategories.interface';

export function getInterestCategories(): Promise<
  AxiosResponse<GetInterestCategoriesResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/category/interest-categories',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetInterestCategoriesResponse>(config);
}
