import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateDPRequest,
  UpdateDPResposne
} from '../../typings/user-profile_interface/updateDP.interface';

export function updateDP({
  profileImage
}: UpdateDPRequest): Promise<AxiosResponse<UpdateDPResposne>> {
  const formdata = new FormData();
  formdata.append('dp', profileImage);

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'user/profile/picture',
    method: 'POST',
    data: formdata
  };

  return axios.request<UpdateDPResposne>(config);
}
