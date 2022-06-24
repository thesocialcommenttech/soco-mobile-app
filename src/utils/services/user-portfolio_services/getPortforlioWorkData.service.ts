import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetPortforlioWorkDataRequest, GetPortforlioWorkDataResponse } from '../../typings/user-portfolio_interface/getPortforlioWorkData.interface';

export function getPortforlioWorkData({
  username
}: GetPortforlioWorkDataRequest): Promise<
  AxiosResponse<GetPortforlioWorkDataResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/data`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { username }
  };

  return axios.request<GetPortforlioWorkDataResponse>(config);
}
