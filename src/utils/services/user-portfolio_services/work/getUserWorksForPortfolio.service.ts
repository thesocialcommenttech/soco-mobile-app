import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Post } from '~/src/utils/typings/post';
import { GetUserWorksForPortfolioResponse } from '~/src/utils/typings/user-portfolio_interface/work/getUserWorksForPortfolio.interface';

export function getUserWorksForPortfolio(postType: Post['postType']) {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/works/${postType}`,
    method: 'GET'
  };

  return axios.request<GetUserWorksForPortfolioResponse>(config);
}
