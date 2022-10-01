import axios, { AxiosRequestConfig } from 'axios';
import { GetPortforlioWorkDataResponse } from '../../typings/user-portfolio_interface/getPortforlioWorkData.interface';
import { User } from '../../typings/user-profile_interface/getUserData.interface';

export function getPortforlioWorkData(username: User['username']) {
  const config: AxiosRequestConfig = {
    url: 'user/portfolio/data',
    method: 'POST',
    data: { username }
  };

  return axios.request<GetPortforlioWorkDataResponse>(config);
}
