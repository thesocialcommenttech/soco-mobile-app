import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IncrementPostViewsResponse } from '../../typings/increment-postviews_interface/incrementPostviews.interface';

export function incrementPostviews(): Promise<
  AxiosResponse<IncrementPostViewsResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/post/increment-view',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<IncrementPostViewsResponse>(config);
}
