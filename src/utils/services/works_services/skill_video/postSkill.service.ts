import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostCreateSkillRequest,
  PostCreateSkillResponse
} from '~/src/utils/typings/works_interface/skill_video/postSkill.interface';

export function postSkill(data: PostCreateSkillRequest) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (['tags', 'category'].includes(key) && value) {
      form.append(key, JSON.stringify(value));
      return;
    }

    if (typeof value === 'boolean' || value) {
      form.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    url: '/user/post/create/skill',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<PostCreateSkillResponse>(config);
}
