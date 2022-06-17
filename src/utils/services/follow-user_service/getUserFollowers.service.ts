import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  GetUserFollowersRequest,
  GetUserFollowersResponse
} from '../../typings/follow-user_interface/getUserFollowers.interface';

export function getUserFollowers({
  proj,
  userID
}: GetUserFollowersRequest): Promise<AxiosResponse<GetUserFollowersResponse>> {
  const config: AxiosRequestConfig = {
    url: '/user/profile/followers',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      proj,
      userID
    }
  };

  return axios.request<GetUserFollowersResponse>(config);
}
