import axios, { AxiosRequestConfig } from 'axios';
import {
  PostCreateArtworkRequest,
  PostCreateArtworkResponse
} from '~/src/utils/typings/works_interface/artwork/postArtwork.interface';

export function postArtwork(data: PostCreateArtworkRequest) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (['tags', 'category'].includes(key) && value) {
      form.append(key, JSON.stringify(value));
      return;
    }

    if (typeof value === 'boolean' || value) {
      form.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    url: '/user/post/create/artwork',
    method: 'POST',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' }
  };

  return axios.request<PostCreateArtworkResponse>(config);
}
