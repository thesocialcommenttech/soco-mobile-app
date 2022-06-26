import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateDPRequest,
  UpdateDPResposne
} from '../../typings/user-profile_interface/updateDP.interface';

export function updateDP({
  dp
}: UpdateDPRequest): Promise<AxiosResponse<UpdateDPResposne>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/profile/picture',
    method: 'POST',
    data: {
      dp
    }
  };

  return axios.request<UpdateDPResposne>(config);
}
