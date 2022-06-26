import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UpdatePortforlioEducationOrderRequest, UpdatePortforlioEducationOrderResponse } from '~/src/utils/typings/user-portfolio_interface/education/updatePortforlioEducationOrder.interface';

export function updatePortforlioEducationOrder({
  order
}: UpdatePortforlioEducationOrderRequest): Promise<
  AxiosResponse<UpdatePortforlioEducationOrderResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/update/education/order`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { order }
  };

  return axios.request<UpdatePortforlioEducationOrderResponse>(config);
}
