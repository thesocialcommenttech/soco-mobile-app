import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortfolioExperienceRequest,
  AddPortfolioExperienceResponse
} from '~/src/utils/typings/user-portfolio_interface/experience/addPortforlioExperience.interface';

export function addPortforlioExperience({
  experience
}: AddPortfolioExperienceRequest): Promise<
  AxiosResponse<AddPortfolioExperienceResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/add/experience`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { experience }
  };

  return axios.request<AddPortfolioExperienceResponse>(config);
}
