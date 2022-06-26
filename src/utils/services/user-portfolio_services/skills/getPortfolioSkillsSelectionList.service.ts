import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetPortfolioSkillsSelectionListResponse } from '~/src/utils/typings/user-portfolio_interface/skills/getPortfolioSkillsSelectionList.interface';

export function getPortfolioSkillsSelectionList(): Promise<
  AxiosResponse<GetPortfolioSkillsSelectionListResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/portfolio/skills/search`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  return axios.request<GetPortfolioSkillsSelectionListResponse>(config);
}
