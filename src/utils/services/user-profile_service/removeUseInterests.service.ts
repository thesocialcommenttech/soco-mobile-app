import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemoveUserInterestResponse } from '../../typings/user-profile_interface/removeUserInterest.interface';

export function removeUserInterest(
  categoryID: string
): Promise<AxiosResponse<RemoveUserInterestResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/interest',
    method: 'DELETE',
    params: { categoryID }
  };

  return axios.request<RemoveUserInterestResponse>(config);
}
