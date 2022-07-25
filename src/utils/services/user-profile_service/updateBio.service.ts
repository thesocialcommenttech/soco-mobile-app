import axios, { AxiosRequestConfig } from 'axios';
import {
  UpdateBioRequest,
  UpdateBioResponse
} from '../../typings/user-profile_interface/updateBio.interface';

export function updateBio({ bio }: UpdateBioRequest) {
  const config: AxiosRequestConfig = {
    url: 'user/profile/bio',
    method: 'POST',
    data: { bio }
  };

  return axios.request<UpdateBioResponse>(config);
}
