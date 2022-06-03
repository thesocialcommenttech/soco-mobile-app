import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ChangeUserPasswordRequest,
  ChangeUserPasswordResponse
} from '~/src/utils/typings/settings_interfaces/passoword_interface/changeUserPassword.interface';

export function changeUserPassword({
  oldPassword,
  newPassword
}: ChangeUserPasswordRequest): Promise<
  AxiosResponse<ChangeUserPasswordResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/settings/password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      oldPassword,
      newPassword
    }
  };

  return axios.request<ChangeUserPasswordResponse>(config);
}
