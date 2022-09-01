import axios, { AxiosRequestConfig } from 'axios';
import { PortfolioData } from '~/src/utils/typings/user-portfolio_interface/getPortforlioWorkData.interface';
import { AddPortforlioBioResponse } from '../../../typings/user-portfolio_interface/bio/addPortforlioBio.interface';

export function addPortforlioBio(bio: PortfolioData['bio']) {
  const config: AxiosRequestConfig = {
    url: 'user/portfolio/add/bio',
    method: 'POST',
    data: { bio }
  };

  return axios.request<AddPortforlioBioResponse>(config);
}
