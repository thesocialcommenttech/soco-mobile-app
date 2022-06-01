import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  FollowUserRequest,
  FollowUserResponse
} from '../../typings/follow-user_interface/followUser.interface';

export function followUser({
  userID
}: FollowUserRequest): Promise<AxiosResponse<FollowUserResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/profile/unfollow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      userID
    }
  };

  return axios.request<FollowUserResponse>(config);
}
