import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  UploadUserKYCRequest,
  UploadUserKYCResponse
} from '../../typings/wallet_interfaces/uploadUserKYC.interface';

export function uploadUserKYC({
  name,
  pan_number,
  dob,
  pan_front_image,
  pan_back_image
}: UploadUserKYCRequest): Promise<AxiosResponse<UploadUserKYCResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/kyc',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name,
      pan_number,
      dob,
      pan_front_image,
      pan_back_image
    }
  };
  return axios.request<UploadUserKYCResponse>(config);
}
