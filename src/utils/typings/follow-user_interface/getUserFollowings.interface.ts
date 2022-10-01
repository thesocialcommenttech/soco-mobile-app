import { User } from '../user-profile_interface/getUserData.interface';
import { GetUserFollowersRequest } from './getUserFollowers.interface';

export type GetUserFollowingRequest = GetUserFollowersRequest;

export interface GetUserFollowingsResponse<T extends keyof User> {
  following?: Pick<User, T>[];
  success?: boolean;
}
