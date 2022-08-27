import axios, { AxiosRequestConfig } from 'axios';
import {
  GetUserFollowersRequest,
  GetUserFollowersResponse
} from '../../typings/follow-user_interface/getUserFollowers.interface';
import { User } from '../../typings/user-profile_interface/getUserData.interface';

export function getUserFollowers<T extends keyof User>({
  proj,
  userID
}: GetUserFollowersRequest) {
  const config: AxiosRequestConfig = {
    url: 'user/profile/followers',
    method: 'POST',
    data: { proj, userID }
  };

  return axios.request<GetUserFollowersResponse<T>>(config);
}
