import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortforlioCertificationRequest,
  AddPortforlioCertificationResponse
} from '~/src/utils/typings/user-portfolio_interface/certifications/addPortforlioCertification.interface';

export function addPortforlioCertification({
  title,
  issue_date,
  credential_id,
  issuer_organization,
  credential_url,
  do_expire,
  certimage
}: AddPortforlioCertificationRequest): Promise<
  AxiosResponse<AddPortforlioCertificationResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/add/certification`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      title,
      issue_date,
      credential_id,
      issuer_organization,
      credential_url,
      do_expire,
      certimage
    }
  };

  return axios.request<AddPortforlioCertificationResponse>(config);
}
