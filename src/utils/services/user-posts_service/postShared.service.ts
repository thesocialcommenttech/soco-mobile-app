import axios, { AxiosRequestConfig } from 'axios';
import {
  PostSharedRequest,
  PostSharedResponse
} from '../../typings/user-posts_interface/postShared.interface';

export function postShared({
  description,
  postedOn,
  sharedPostID,
  sharedPostType
}: PostSharedRequest) {
  const config: AxiosRequestConfig = {
    url: '/user/post/create/shared',
    method: 'POST',
    data: { description, postedOn, sharedPostID, sharedPostType }
  };
  return axios.request<PostSharedResponse>(config);
}
