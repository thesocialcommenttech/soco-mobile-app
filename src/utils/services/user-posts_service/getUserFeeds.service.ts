import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getUserFeedsResponse } from '../../typings/user-posts_interface/getUserFeeds.interface';

export function getUserFeeds(): Promise<AxiosResponse<getUserFeedsResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/post/feeds',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<getUserFeedsResponse>(config);
}
