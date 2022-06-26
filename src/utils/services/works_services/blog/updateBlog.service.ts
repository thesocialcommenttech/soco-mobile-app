import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateBlogRequest,
  UpdateBlogResponse
} from '~/src/utils/typings/works_interface/blog/updateBlog.interface';

export function updateBlog(
  { contentJSON, contentText, title, postStatus, updatedOn }: UpdateBlogRequest,
  postID: string
): Promise<AxiosResponse<UpdateBlogResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/post/update/blog/${postID}`,
    method: 'POST',
    data: { contentJSON, contentText, title, postStatus, updatedOn }
  };

  return axios.request<UpdateBlogResponse>(config);
}
