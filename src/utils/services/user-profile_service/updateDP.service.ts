import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateDPRequest,
  UpdateDPResposne
} from '../../typings/user-profile_interface/updateDP.interface';

export function updateDP({
  dp
}: UpdateDPRequest): Promise<AxiosResponse<UpdateDPResposne>> {
  // console.log(dp.getParts());
  const config: AxiosRequestConfig = {
    baseURL: 'https://thesocialcomment-backend-test.herokuapp.com',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/user/profile/picture',
    method: 'POST',
    data: dp
  };

  return axios.request<UpdateDPResposne>(config);
}
