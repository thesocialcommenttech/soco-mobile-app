import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UpdatePortforlioCertificationRequest,UpdatePortforlioCertificationResponse } from '~/src/utils/typings/user-portfolio_interface/certifications/updatePortforlioCertification.interface';

export function updatePortforlioCertification({
  title,
  issue_date,
  credential_id,
  issuer_organization,
  credential_url,
  do_expire,
  certimage
}: UpdatePortforlioCertificationRequest): Promise<
  AxiosResponse<UpdatePortforlioCertificationResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/update/certification`,
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

  return axios.request<UpdatePortforlioCertificationResponse>(config);
}
