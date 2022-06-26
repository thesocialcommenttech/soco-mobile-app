import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  GetPortforlioProfileDataRequest,
  GetPortforlioProfileDataResponse
} from '../../typings/user-portfolio_interface/getPortforlioProfileData.interface';

export function getPortforlioProfileData({
  username
}: GetPortforlioProfileDataRequest): Promise<
  AxiosResponse<GetPortforlioProfileDataResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/profile`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { username }
  };

  return axios.request<GetPortforlioProfileDataResponse>(config);
}
