import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateCoverRequest,
  UpdateCoverResponse
} from '../../typings/user-profile_interface/updateCover.interface';

export function updateCover({
  cover
}: UpdateCoverRequest): Promise<AxiosResponse<UpdateCoverResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/profile/cover',
    method: 'POST',
    data: {
      cover
    }
  };

  return axios.request<UpdateCoverResponse>(config);
}
