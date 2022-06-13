import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortforlioSocialAccountsResponse,
  Social_accounts
} from '~/src/utils/typings/user-portfolio_interface/social-links/addPortforlioSocialAccounts.interface';

export function addPortforlioSocialAccounts(
  account_urls: Social_accounts
): Promise<AxiosResponse<AddPortforlioSocialAccountsResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/portfolio/add/social-account`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: account_urls
  };

  return axios.request<AddPortforlioSocialAccountsResponse>(config);
}
