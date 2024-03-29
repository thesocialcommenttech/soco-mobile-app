import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostBlogRequest,
  PostBlogResponse
} from '~/src/utils/typings/works_interface/blog/postBlog.interface';

export function postBlog(
  postStatus: PostBlogRequest
): Promise<AxiosResponse<PostBlogResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/post/create/blog',
    method: 'POST',
    data: postStatus,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<PostBlogResponse>(config);
}
