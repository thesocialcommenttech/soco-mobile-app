import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RemovePortforlioWorkRequest,
  RemovePortforlioWorkResponse
} from '~/src/utils/typings/user-portfolio_interface/work/removePortforlioWork.interface';

export function removePortforlioWork({
  postType,
  postId
}: RemovePortforlioWorkRequest): Promise<
  AxiosResponse<RemovePortforlioWorkResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/remove/work',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { postType, postId }
  };

  return axios.request<RemovePortforlioWorkResponse>(config);
}
