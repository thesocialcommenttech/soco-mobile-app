import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemovePortforlioCertificateRequest, RemovePortforlioCertificateResponse } from '~/src/utils/typings/user-portfolio_interface/certifications/removePortforlioCertificate.interface';

export function removePortforlioCertificate({
  certificateId
}: RemovePortforlioCertificateRequest): Promise<
  AxiosResponse<RemovePortforlioCertificateResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/remove/certification`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { certificateId }
  };

  return axios.request<RemovePortforlioCertificateResponse>(config);
}
