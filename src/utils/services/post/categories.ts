import axios, { AxiosRequestConfig } from 'axios';
import { PostType } from '../../typings/post';
import { GetCategoriesResponse } from '../../typings/postCategory';

export function getCategories(postType: PostType) {
  const config: AxiosRequestConfig = {
    url: `/category/${postType}`,
    method: 'GET'
  };

  return axios.request<GetCategoriesResponse>(config);
}
