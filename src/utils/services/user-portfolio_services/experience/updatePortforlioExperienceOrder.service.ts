import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UpdatePortforlioExperienceOrderRequest, UpdatePortforlioExperienceOrderResponse } from '~/src/utils/typings/user-portfolio_interface/experience/updatePortforlioExperienceOrder.inerface';

export function updatePortforlioExperienceOrder({
  experienceOrder
}: UpdatePortforlioExperienceOrderRequest): Promise<
  AxiosResponse<UpdatePortforlioExperienceOrderResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/update/experience/order`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { experienceOrder }
  };

  return axios.request<UpdatePortforlioExperienceOrderResponse>(config);
}
