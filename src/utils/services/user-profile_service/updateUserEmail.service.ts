import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  CheckAvailabilityRequest,
  CheckAvailabilityResponse,
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

export function checkAvailablity({
  property,
  value,
  controller
}: CheckAvailabilityRequest) {
  const config: AxiosRequestConfig = {
    url: 'user/availability',
    method: 'GET',
    params: { property, value },
    ...(controller && { cancelToken: controller.token })
  };

  return axios.request<CheckAvailabilityResponse>(config);
}
