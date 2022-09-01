import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  SetPortforlioWorkDataRequest,
  SetPortforlioWorkDataResponse
} from '~/src/utils/typings/user-portfolio_interface/work/setPortforlioWorkData.interface';

export function setPortforlioWorkData({
  postType,
  postsList
}: SetPortforlioWorkDataRequest) {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/add/work',
    method: 'POST',
    data: { postType, postsList }
  };

  return axios.request<SetPortforlioWorkDataResponse>(config);
}
