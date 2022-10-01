import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  MarkNotificationsAsReadRequest,
  MarkNotificationsAsReadResponse
} from '../../typings/notifications_interface/markNotificationsAsRead.interface';

export function markNotificationsAsRead(
  notifications: MarkNotificationsAsReadRequest
): Promise<AxiosResponse<MarkNotificationsAsReadResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/notifications/read',
    method: 'POST',
    data: notifications
  };

  return axios.request<MarkNotificationsAsReadResponse>(config);
}
