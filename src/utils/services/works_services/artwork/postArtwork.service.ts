import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostCreateArtworkRequest,
  PostCreateArtworkResponse
} from '~/src/utils/typings/works_interface/artwork/postArtwork.interface';

export function postCreateArtwork({
  title,
  description,
  tags,
  category,
  artwork,
  postedOn,
  postStatus
}: PostCreateArtworkRequest): Promise<
  AxiosResponse<PostCreateArtworkResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/post/create/artwork',
    method: 'POST',
    data: { title, description, tags, category, artwork, postedOn, postStatus },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<PostCreateArtworkResponse>(config);
}
