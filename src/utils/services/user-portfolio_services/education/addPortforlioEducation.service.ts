import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortforlioEducationRequest,
  AddPortforlioEducationResponse
} from '~/src/utils/typings/user-portfolio_interface/education/addPortforlioEducation.interface';

export function addPortforlioEducation({
  education
}: AddPortforlioEducationRequest): Promise<
  AxiosResponse<AddPortforlioEducationResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/add/education',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { education }
  };

  return axios.request<AddPortforlioEducationResponse>(config);
}
