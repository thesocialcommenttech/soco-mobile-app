import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateSkillRequest,
  UpdateSkillResponse
} from '~/src/utils/typings/works_interface/skill_video/updateSkill.interface';

export function updateSkill({
  title,
  description,
  tags,
  category,
  video,
  featureImage,
  postedOn,
  postStatus,
  updatedOn
}: UpdateSkillRequest, postID:string): Promise<AxiosResponse<UpdateSkillResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/post/update/skill/${postID}`,
    method: 'POST',
    data: {
      title,
      description,
      tags,
      category,
      video,
      featureImage,
      postedOn,
      postStatus,
      updatedOn
    }
  };

  return axios.request<UpdateSkillResponse>(config);
}
