import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateArtworkRequest,
  UpdateArtworkResponse
} from '~/src/utils/typings/works_interface/artwork/updateArtwork.interface';

export function updateArtwork(artwork: UpdateArtworkRequest, postID: string) {
  const form = new FormData();

  Object.entries(artwork).forEach(([key, value]) => {
    if (['tags', 'category'].includes(key) && value) {
      form.append(key, JSON.stringify(value));
      return;
    }

    if (typeof value === 'boolean' || value) {
      form.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    url: `/user/post/update/artwork/${postID}`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<UpdateArtworkResponse>(config);
}
