import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortforlioCertificationRequest,
  AddPortforlioCertificationResponse
} from '~/src/utils/typings/user-portfolio_interface/certifications/addPortforlioCertification.interface';
import { isNil, isEmpty } from 'lodash';

export function addPortforlioCertification(
  data: AddPortforlioCertificationRequest
) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'boolean' || value) {
      form.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    url: '/user/portfolio/add/certification',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<AddPortforlioCertificationResponse>(config);
}
