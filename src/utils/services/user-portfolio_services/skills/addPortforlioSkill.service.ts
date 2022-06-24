import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AddPortforlioSkillRequest,  AddPortforlioSkillResponse} from '~/src/utils/typings/user-portfolio_interface/skills/addPortforlioSkill.interface';

export function addPortforlioSkill({
  skill
}: AddPortforlioSkillRequest): Promise<
  AxiosResponse<AddPortforlioSkillResponse>
> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/add/skill`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { skill }
  };

  return axios.request<AddPortforlioSkillResponse>(config);
}
