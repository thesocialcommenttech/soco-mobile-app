import { Interests } from '../settings_interfaces/interests_interface/getInterestCategories.interface';

export interface AddUserInterestsResponse {
  categories: Interests[];
  success: boolean;
}

export type InterestCategoryId = Interests['_id'];

export type UpdateInterestsResponse = AddUserInterestsResponse;
