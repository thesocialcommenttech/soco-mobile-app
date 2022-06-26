import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserWorksForPortfolioResponse } from '~/src/utils/typings/user-portfolio_interface/work/getUserWorksForPortfolio.interface';

export function getUserWorksForPortfolio(
  postType: string
): Promise<AxiosResponse<GetUserWorksForPortfolioResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/works/${postType}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetUserWorksForPortfolioResponse>(config);
}
