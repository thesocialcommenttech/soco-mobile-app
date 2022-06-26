import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  ChangeNotificationSettingsResponse,
  ChangeNotificationSettingsRequest
} from '../../typings/notifications_interface/changeNotificationSettings.interface';

export function changeNotificationSettings({
  newsletter
}: ChangeNotificationSettingsRequest): Promise<
  AxiosResponse<ChangeNotificationSettingsResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/settings/notification',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      newsletter
    }
  };

  return axios.request<ChangeNotificationSettingsResponse>(config);
}
