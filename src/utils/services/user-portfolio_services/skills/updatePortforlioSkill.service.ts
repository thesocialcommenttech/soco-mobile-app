import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdatePortforlioSkillRequest,
  UpdatePortforlioSkillResponse
} from '~/src/utils/typings/user-portfolio_interface/skills/updatePortforlioSkill.interface';

export function updatePortforlioSkill({
  skill,
  indexID
}: UpdatePortforlioSkillRequest): Promise<
  AxiosResponse<UpdatePortforlioSkillResponse>
> {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/update/skill',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { skill, indexID }
  };

  return axios.request<UpdatePortforlioSkillResponse>(config);
}
