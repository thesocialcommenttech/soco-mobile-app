import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SetPortforlioWorkDataRequest, SetPortforlioWorkDataResponse } from '~/src/utils/typings/user-portfolio_interface/work/setPortforlioWorkData.interface';

export function setPortforlioWorkData({
  postType,postList
}: SetPortforlioWorkDataRequest): Promise<
  AxiosResponse<SetPortforlioWorkDataResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/add/work`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { postType,postList }
  };

  return axios.request<SetPortforlioWorkDataResponse>(config);
}
