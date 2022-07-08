import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateCaptionRequest,
  UpdateCaptionResponse
} from '../../typings/user-profile_interface/updateCaption.interface';

export function updateCaption({
  caption
}: UpdateCaptionRequest): Promise<AxiosResponse<UpdateCaptionResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/profile/caption',
    method: 'POST',
    data: {
      caption
    }
  };

  return axios.request<UpdateCaptionResponse>(config);
}
