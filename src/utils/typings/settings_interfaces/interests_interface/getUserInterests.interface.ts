import { Interests } from './getInterestCategories.interface';

export interface GetUserInterestsResponse {
  interested_categories?: Interests[];
  success?: boolean;
}
