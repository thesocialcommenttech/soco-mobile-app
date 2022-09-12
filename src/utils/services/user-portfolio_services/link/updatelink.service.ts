import axios, { AxiosRequestConfig } from 'axios';
import { PostLinkRequest } from '~/src/utils/typings/user-portfolio_interface/link/postLink.interface';
import { UpdateLinkResponse } from '~/src/utils/typings/user-portfolio_interface/link/updateLink.interface';

export function updateLink(data: PostLinkRequest, postId: string) {
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
    url: `/user/post/update/link/${postId}`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<UpdateLinkResponse>(config);
}
