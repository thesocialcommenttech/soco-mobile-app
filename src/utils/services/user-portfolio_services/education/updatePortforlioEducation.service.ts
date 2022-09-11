import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdatePortforlioEducationRequest,
  UpdatePortforlioEducationResponse
} from '~/src/utils/typings/user-portfolio_interface/education/updatePortforlioEducation.interface';

export function updatePortforlioEducation({
  education,
  indexID
}: UpdatePortforlioEducationRequest) {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/update/education',
    method: 'POST',
    data: { education, indexID }
  };

  return axios.request<UpdatePortforlioEducationResponse>(config);
}
