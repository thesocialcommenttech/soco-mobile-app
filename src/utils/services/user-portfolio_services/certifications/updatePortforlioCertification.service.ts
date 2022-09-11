import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdatePortforlioCertificationRequest,
  UpdatePortforlioCertificationResponse
} from '~/src/utils/typings/user-portfolio_interface/certifications/updatePortforlioCertification.interface';

export function updatePortforlioCertification({
  certification,
  indexID
}: UpdatePortforlioCertificationRequest) {
  const form = new FormData();

  for (const key in certification) {
    if (typeof certification[key] === 'boolean' || certification[key]) {
      form.append(key, certification[key]);
    }
  }

  const config: AxiosRequestConfig = {
    url: '/user/portfolio/update/certification',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form,
    params: { indexID }
  };

  return axios.request<UpdatePortforlioCertificationResponse>(config);
}
