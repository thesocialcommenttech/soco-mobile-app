import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostLinkRequest,
  PostLinkResponse
} from '~/src/utils/typings/user-portfolio_interface/link/postLink.interface';

export function postLink({
  title,
  description,
  featureImage,
  tags,
  link,
  postedOn,
  postStatus
}: PostLinkRequest): Promise<AxiosResponse<PostLinkResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/post/create/link',
    method: 'POST',
    data: { title, description, featureImage, tags, link, postedOn, postStatus }
  };

  return axios.request<PostLinkResponse>(config);
}
