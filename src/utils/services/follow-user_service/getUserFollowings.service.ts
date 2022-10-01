import axios, { AxiosRequestConfig } from 'axios';
import {
  GetUserFollowingRequest,
  GetUserFollowingsResponse
} from '../../typings/follow-user_interface/getUserFollowings.interface';
import { User } from '../../typings/user-profile_interface/getUserData.interface';

export function getUserFollowings<T extends keyof User>({
  proj,
  userID
}: GetUserFollowingRequest) {
  const config: AxiosRequestConfig = {
    url: 'user/profile/followings',
    method: 'POST',
    data: { proj, userID }
  };

  return axios.request<GetUserFollowingsResponse<T>>(config);
}
