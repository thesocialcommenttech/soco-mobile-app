import { User } from '../user-profile_interface/getUserData.interface';

export type UserPortfolioProfile = Pick<
  User,
  | 'academics'
  | 'bio'
  | 'dateOfBirth'
  | 'email'
  | 'name'
  | 'phone'
  | 'portfolioLock'
  | 'premium'
  | 'profileImage'
  | 'username'
  | '_id'
>;

export interface GetPortforlioProfileDataResponse {
  data?: UserPortfolioProfile;
  success?: boolean;
}
