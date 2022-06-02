import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostCreateProjectRequest,
  PostCreateProjectResponse
} from '~/src/utils/typings/works_interface/project/postproject.interface';

export function postProject({
  title,
  team,
  introduction,
  aim,
  tags,
  content,
  featureImage,
  postedOn,
  updatedOn,
  postStatus,
  files
}: PostCreateProjectRequest): Promise<
  AxiosResponse<PostCreateProjectResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/post/create/project',
    method: 'POST',
    data: {
      title,
      team,
      introduction,
      aim,
      tags,
      content,
      featureImage,
      postedOn,
      updatedOn,
      postStatus,
      files
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<PostCreateProjectResponse>(config);
}
