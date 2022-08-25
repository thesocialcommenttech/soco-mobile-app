import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  UploadUserKYCRequest,
  UploadUserKYCResponse
} from '../../typings/wallet_interfaces/uploadUserKYC.interface';

export function uploadUserKYC(
  data: UploadUserKYCRequest
): Promise<AxiosResponse<UploadUserKYCResponse>> {
  const formdata = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formdata.append(key, value);
  });
  console.log(data);

  const config: AxiosRequestConfig = {
    url: 'user/kyc',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  };
  return axios.request<UploadUserKYCResponse>(config);
}
