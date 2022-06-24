import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SetOnlineStatusResponse } from '../../typings/session_interface/setOnlineStatus.interface';

export function closeSession(): Promise<AxiosResponse<SetOnlineStatusResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/online-session/end',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axios.request<SetOnlineStatusResponse>(config);
}
