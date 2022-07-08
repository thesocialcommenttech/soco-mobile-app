import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  MarkNotificationsAsReadRequest,
  MarkNotificationsAsReadResponse
} from '../../typings/notifications_interface/markNotificationsAsRead.interface';

export function markNotificationsAsRead(
  notifications: MarkNotificationsAsReadRequest
): Promise<AxiosResponse<MarkNotificationsAsReadResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/notifications/read',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: notifications
  };

  return axios.request<MarkNotificationsAsReadResponse>(config);
}
