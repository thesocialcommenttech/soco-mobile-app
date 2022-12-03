import axios, { AxiosRequestConfig } from 'axios';
import { PostOnboardResponse } from '../../typings/user-profile_interface/postOnboard.interface';

export function postOnboard() {
  const config: AxiosRequestConfig = { url: 'user/events/onboard' };
  return axios.request<PostOnboardResponse>(config);
}
