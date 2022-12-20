import axios, { AxiosRequestConfig } from 'axios';

export function resetUserPassword(
  newPassword: string,
  hashString: string
) {
  const config: AxiosRequestConfig = {
    url: '/user/reset-password',
    method: 'POST',
    data: { newPassword, hashString }
  };

  return axios.request<{ success: boolean }>(config);
}
