import axios, { AxiosRequestConfig } from 'axios';
import { Interests } from '../../typings/settings_interfaces/interests_interface/getInterestCategories.interface';
import {
  AddUserInterestsResponse,
  InterestCategoryId,
  UpdateInterestsResponse
} from '../../typings/user-profile_interface/userInterests.interface';

export function addUserInterests(categories: Interests[]) {
  const config: AxiosRequestConfig = {
    url: 'user/interest',
    method: 'POST',
    data: { categories }
  };

  return axios.request<AddUserInterestsResponse>(config);
}

export function updateUserInterests(categories: InterestCategoryId[]) {
  const config: AxiosRequestConfig = {
    url: 'user/interest/update',
    method: 'POST',
    data: { interest_categories: categories }
  };

  return axios.request<UpdateInterestsResponse>(config);
}
