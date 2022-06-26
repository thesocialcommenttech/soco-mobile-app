import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UpdatePortforlioEducationRequest, UpdatePortforlioEducationResponse } from '~/src/utils/typings/user-portfolio_interface/education/updatePortforlioEducation.interface'; 

export function updatePortforlioEducation({
  education, indexID
}: UpdatePortforlioEducationRequest): Promise<
  AxiosResponse<UpdatePortforlioEducationResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/update/education`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { education, indexID }
  };

  return axios.request<UpdatePortforlioEducationResponse>(config);
}
