import axios, { AxiosRequestConfig } from 'axios';
import { FollowUserResponse } from '../../typings/follow-user_interface/followUser.interface';
import { User } from '../../typings/user-profile_interface/getUserData.interface';

export function followUser(userID: User['_id']) {
  const config: AxiosRequestConfig = {
    url: 'user/profile/follow',
    method: 'POST',
    data: { userID }
  };

  return axios.request<FollowUserResponse>(config);
}
