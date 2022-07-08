import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostSharedRequest,
  PostSharedResponse
} from '../../typings/user-posts_interface/postShared.interface';

export function postShared({
  description,
  postedOn,
  sharedPostID,
  sharedPostType
}: PostSharedRequest): Promise<AxiosResponse<PostSharedResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/post/create/shared',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { description, postedOn, sharedPostID, sharedPostType }
  };
  return axios.request<PostSharedResponse>(config);
}
