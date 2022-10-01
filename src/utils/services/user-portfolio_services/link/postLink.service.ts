import axios, { AxiosRequestConfig } from 'axios';
import {
  PostLinkRequest,
  PostLinkResponse
} from '~/src/utils/typings/user-portfolio_interface/link/postLink.interface';

export function postLink(data: PostLinkRequest) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'tags' && value) {
      form.append(key, JSON.stringify(value));
      return;
    }
    if (typeof value === 'boolean' || value) {
      form.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    url: '/user/post/create/link',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<PostLinkResponse>(config);
}
