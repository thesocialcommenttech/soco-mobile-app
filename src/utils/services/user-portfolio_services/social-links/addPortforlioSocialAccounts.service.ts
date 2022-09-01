import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AddPortforlioSocialAccountsResponse,
  Social_accounts
} from '~/src/utils/typings/user-portfolio_interface/social-links/addPortforlioSocialAccounts.interface';

export function addPortforlioSocialAccounts(account_urls: Social_accounts) {
  const config: AxiosRequestConfig = {
    url: '/user/portfolio/add/social-account',
    method: 'POST',
    data: Object.entries(account_urls).reduce((p, [key, value]) => {
      p[key] = value || null;
      return p;
    }, {})
  };

  return axios.request<AddPortforlioSocialAccountsResponse>(config);
}
