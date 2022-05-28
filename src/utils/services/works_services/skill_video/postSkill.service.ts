import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PostCreateSkillRequest, PostCreateSkillResponse } from '~/src/utils/typings/works_interface/skill_video/postSkill.interface';

export function postCreateBlog(
    {
        title,
        description,
        tags,
        category,
        video,
        featureImage,
        postedOn,
        postStatus,
        updatedOn
      }: PostCreateSkillRequest
): Promise<AxiosResponse<PostCreateSkillResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/post/create/skill',
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
      },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<PostCreateSkillResponse>(config);
}
