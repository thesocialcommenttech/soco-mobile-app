import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateProjectRequest,
  UpdateProjectResponse
} from '~/src/utils/typings/works_interface/project/updateProject.interface';

export function updateProject(
  {
    title,
    team,
    introduction,
    aim,
    tags,
    content,
    postedOn,
    updatedOn,
    postStatus,
    files
  }: UpdateProjectRequest,
  postID: string
): Promise<AxiosResponse<UpdateProjectResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/post/update/project/${postID}`,
    method: 'POST',
    data: {
      title,
      team,
      introduction,
      aim,
      tags,
      content,
      postedOn,
      updatedOn,
      postStatus,
      files
    }
  };

  return axios.request<UpdateProjectResponse>(config);
}
