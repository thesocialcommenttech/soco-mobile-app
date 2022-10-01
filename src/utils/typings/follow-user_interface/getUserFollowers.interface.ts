import { User } from '../user-profile_interface/getUserData.interface';

export interface GetUserFollowersRequest {
  proj: string;
  userID: User['_id'];
}

export interface GetUserFollowersResponse<T extends keyof User> {
  followers: Pick<User, T>[];
  success: boolean;
}
