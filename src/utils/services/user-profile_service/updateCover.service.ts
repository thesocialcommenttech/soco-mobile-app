import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateCoverRequest,
  UpdateCoverResponse
} from '../../typings/user-profile_interface/updateCover.interface';

export function updateCover({
  coverImage
}: UpdateCoverRequest): Promise<AxiosResponse<UpdateCoverResponse>> {
  const formdata = new FormData();
  formdata.append('cover', coverImage);

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'user/profile/cover',
    method: 'POST',
    data: formdata
  };

  return axios.request<UpdateCoverResponse>(config);
}
