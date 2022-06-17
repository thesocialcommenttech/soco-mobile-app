import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { LockUserPortfolioResponse } from '../../typings/user-portfolio_interface/lockUserPortfolio.interface';

export function lockUserPortfolio(
  state: string
): Promise<AxiosResponse<LockUserPortfolioResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolioLock/${state}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<LockUserPortfolioResponse>(config);
}
