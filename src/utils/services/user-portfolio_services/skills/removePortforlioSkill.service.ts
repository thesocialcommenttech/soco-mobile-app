import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RemovePortforlioSkillRequest, RemovePortforlioSkillResponse } from '~/src/utils/typings/user-portfolio_interface/skills/removePortforlioSkill.interface';

export function removePortforlioSkill({
    skillId
}: RemovePortforlioSkillRequest): Promise<
  AxiosResponse<RemovePortforlioSkillResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/remove/skill`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { skillId }
  };

  return axios.request<RemovePortforlioSkillResponse>(config);
}
