import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UpdateArtworkRequest, UpdateArtworkResponse } from '~/src/utils/typings/works_interface/artwork/updateArtwork.interface';

export function updateArtwork({
  title,
  description,
  tags,
  category,
  artwork,
  postedOn,
  postStatus
}: UpdateArtworkRequest, postID:string): Promise<
  AxiosResponse<UpdateArtworkResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/post/update/artwork/${postID}`,
    method: 'POST',
    data: { title, description, tags, category, artwork, postedOn, postStatus },
  };

  return axios.request<UpdateArtworkResponse>(config);
}
