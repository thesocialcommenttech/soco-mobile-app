import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdatePortforlioExperienceRequest,
  UpdatePortforlioExperienceResponse
} from '~/src/utils/typings/user-portfolio_interface/experience/updatePortforlioExperience.interface';

export function updatePortforlioExperience({
  experience,
  indexID
}: UpdatePortforlioExperienceRequest): Promise<
  AxiosResponse<UpdatePortforlioExperienceResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/update/experience`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { experience, indexID }
  };

  return axios.request<UpdatePortforlioExperienceResponse>(config);
}
