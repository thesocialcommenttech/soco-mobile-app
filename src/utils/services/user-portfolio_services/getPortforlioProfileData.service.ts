import axios, { AxiosRequestConfig } from 'axios';
import { GetPortforlioProfileDataResponse } from '../../typings/user-portfolio_interface/getPortforlioProfileData.interface';
import { User } from '../../typings/user-profile_interface/getUserData.interface';

export function getPortforlioProfileData(username: User['username']) {
  const config: AxiosRequestConfig = {
    url: 'user/portfolio/profile',
    method: 'POST',
    data: { username }
  };

  return axios.request<GetPortforlioProfileDataResponse>(config);
}
