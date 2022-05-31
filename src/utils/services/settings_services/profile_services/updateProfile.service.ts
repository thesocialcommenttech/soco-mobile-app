import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateProfileRequest,
  UpdateProfileResponse
} from '~/src/utils/typings/settings_interfaces/profile_interface/updateProfile.interface';

export function updateProfile({
  academics,
  gender,
  name,
  phone,
  username
}: UpdateProfileRequest): Promise<AxiosResponse<UpdateProfileResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/settings/profile',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      academics,
      gender,
      name,
      phone,
      username
    }
  };

  return axios.request<UpdateProfileResponse>(config);
}
