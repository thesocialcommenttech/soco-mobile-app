import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { RemovePortfolioIntroVideoResponse } from '../../typings/user-portfolio_interface/removePortfolioIntroVideo.interface ';

export function removePortfolioIntroVideo(): Promise<
  AxiosResponse<RemovePortfolioIntroVideoResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/remove/intro-video`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<RemovePortfolioIntroVideoResponse>(config);
}
