import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RemovePortforlioExperienceRequest,
  RemovePortforlioExperienceResponse
} from '~/src/utils/typings/user-portfolio_interface/experience/removePortforlioExperience.interface';

export function removePortforlioExperience({
  experienceId
}: RemovePortforlioExperienceRequest): Promise<
  AxiosResponse<RemovePortforlioExperienceResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/remove/experience',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { experienceId }
  };

  return axios.request<RemovePortforlioExperienceResponse>(config);
}
