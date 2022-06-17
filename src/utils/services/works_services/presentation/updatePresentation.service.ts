import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdatePresentationRequest,
  UpdatePresentationResponse
} from '~/src/utils/typings/works_interface/presentation/updatePresentation.interface';

export function updatePresentation(
  { tags, description, featureImage, slides, totalSlides, postedOn, title, postStatus, updatedOn }: UpdatePresentationRequest,
  postID: string
): Promise<AxiosResponse<UpdatePresentationResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/post/update/presentation/${postID}`,
    method: 'POST',
    data: { tags, description, featureImage, slides, totalSlides, postedOn, title, postStatus, updatedOn }
  };

  return axios.request<UpdatePresentationResponse>(config);
}
