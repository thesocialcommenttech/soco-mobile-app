import axios, { AxiosRequestConfig } from 'axios';
import { LockUserPortfolioResponse } from '../../typings/user-portfolio_interface/lockUserPortfolio.interface';

export function lockUserPortfolio(state: 'PUBLIC' | 'PRIVATE') {
  const config: AxiosRequestConfig = {
    url: `/user/portfolioLock/${state}`,
    method: 'GET'
  };

  return axios.request<LockUserPortfolioResponse>(config);
}
