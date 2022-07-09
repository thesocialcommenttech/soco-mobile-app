import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getUserFeedsResponse } from '../../typings/user-posts_interface/getUserFeeds.interface';

export function getUserFeeds(
  projection: any = '',
  pageNo: any = 0,
  size?: any
): Promise<AxiosResponse<getUserFeedsResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/post/feeds',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { projection, pageNo, ...(size && { limit: size }) }
  };
  return axios.request<getUserFeedsResponse>(config);
}
