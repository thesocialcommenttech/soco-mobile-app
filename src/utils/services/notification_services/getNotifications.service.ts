import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { GetNotificatiosnresponse } from '../../typings/notifications_interface/getNotifications.interface';

export function getNotifications(): Promise<
  AxiosResponse<GetNotificatiosnresponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/notifications',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<GetNotificatiosnresponse>(config);
}
