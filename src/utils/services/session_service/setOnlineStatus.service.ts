import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SetOnlineStatusResponse } from '../../typings/session_interface/setOnlineStatus.interface';

export function setOnlineStatus(): Promise<AxiosResponse<SetOnlineStatusResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/online-session/start',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<SetOnlineStatusResponse>(config);
}
