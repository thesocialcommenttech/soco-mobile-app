import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateUserInterestRequest,
  UpdateUserInterestResponse
} from '~/src/utils/typings/settings_interfaces/interests_interface/updateUserInterest.interface';

export function updateUserInterest({
  interest_categories
}: UpdateUserInterestRequest): Promise<
  AxiosResponse<UpdateUserInterestResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/interest/update',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { interest_categories }
  };

  return axios.request<UpdateUserInterestResponse>(config);
}
