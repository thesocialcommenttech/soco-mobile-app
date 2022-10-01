import { User } from '../user-profile_interface/getUserData.interface';

export type ReferredUser = Pick<
  User,
  '_id' | 'name' | 'username' | 'premium' | 'profileImage'
>;

export interface GetUserReferredUsersResponse {
  referred_users?: {
    user: ReferredUser;
    _id: string;
  }[];
  success?: boolean;
}
