import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PostStatus, PostType } from '../../typings/post';
import {
  GetPostsOfTypeRequestData,
  GetPostsOfTypeResponse,
  GetPostsResponse
} from '../../typings/user-posts_interface/getPosts.interface';

export function getPosts(
  userID: string,
  pageNo: number = 0,
  projection: string = '',
  size: number = 30
): Promise<AxiosResponse<GetPostsResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/post/all',
    method: 'GET',
    params: { userID: userID, projection, pageNo, size }
  };
  return axios.request<GetPostsResponse>(config);
}

export function getAllPostsOfType({
  userID,
  projection = '',
  postType,
  postStatus
}: GetPostsOfTypeRequestData) {
  const config: AxiosRequestConfig = {
    url: `user/post/all/${postType}`,
    method: 'GET',
    params: { userID, projection, ...(postStatus && { postStatus }) }
  };
  return axios.request<GetPostsOfTypeResponse>(config);
}
