import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortfolioIntroVideoRequest,
  AddPortfolioIntroVideoResponse
} from '../../typings/user-portfolio_interface/addPortfolioIntroVideo.interface';

export function addPortfolioIntroVideo({
  introvideo
}: AddPortfolioIntroVideoRequest): Promise<
  AxiosResponse<AddPortfolioIntroVideoResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/add/intro-video`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { introvideo }
  };

  return axios.request<AddPortfolioIntroVideoResponse>(config);
}
