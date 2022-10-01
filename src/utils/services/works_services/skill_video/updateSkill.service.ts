import axios, { AxiosRequestConfig } from 'axios';
import {
  UpdateSkillRequest,
  UpdateSkillResponse
} from '~/src/utils/typings/works_interface/skill_video/updateSkill.interface';

export function updateSkill(data: UpdateSkillRequest, postID: string) {
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
    url: `/user/post/update/skill/${postID}`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<UpdateSkillResponse>(config);
}
