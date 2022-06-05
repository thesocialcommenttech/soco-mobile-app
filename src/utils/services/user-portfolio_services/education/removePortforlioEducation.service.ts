import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemovePortforlioEducationRequest, RemovePortforlioEducationResponse } from '~/src/utils/typings/user-portfolio_interface/education/removePortforlioEducation.interface';

export function removePortforlioEducation({
  educationId
}: RemovePortforlioEducationRequest): Promise<
  AxiosResponse<RemovePortforlioEducationResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/remove/education`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { educationId}
  };

  return axios.request<RemovePortforlioEducationResponse>(config);
}
