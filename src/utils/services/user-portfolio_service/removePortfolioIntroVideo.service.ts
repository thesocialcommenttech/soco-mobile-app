import axios, { AxiosRequestConfig } from 'axios';
import { RemovePortfolioIntroVideoResponse } from '../../typings/user-portfolio_interface/removePortfolioIntroVideo.interface ';

export function removePortfolioIntroVideo() {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/remove/intro-video',
    method: 'POST'
  };

  return axios.request<RemovePortfolioIntroVideoResponse>(config);
}
