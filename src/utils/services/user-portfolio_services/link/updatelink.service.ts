import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UpdateLinkRequest, UpdateLinkResponse } from '~/src/utils/typings/user-portfolio_interface/link/updateLink.interface';

export function updateLink({
  title, description, featureImage, tags, link, postedOn, postStatus
}: UpdateLinkRequest, postId:string): Promise<
  AxiosResponse<UpdateLinkResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/post/update/link/${postId}`,
    method: 'POST',
    data: { title, description, featureImage, tags, link, postedOn, postStatus }
  };

  return axios.request<UpdateLinkResponse>(config);
}
