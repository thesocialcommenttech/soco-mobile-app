import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateUserEmailRequest,
  UpdateUserEmailResponse
} from '../../typings/user-profile_interface/updateUserEmail.interface';

export function updateUserEmail({
  email
}: UpdateUserEmailRequest): Promise<AxiosResponse<UpdateUserEmailResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/settings/email',
    method: 'POST',
    data: {
      email
    }
  };

  return axios.request<UpdateUserEmailResponse>(config);
}
