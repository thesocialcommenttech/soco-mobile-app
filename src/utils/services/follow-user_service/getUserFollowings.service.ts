import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserFollowingsRequest, GetUserFollowingsResponse } from '../../typings/follow-user_interface/getUserFollowings.interface';

export function getUserFollowings({
  proj,
  userID
}: GetUserFollowingsRequest): Promise<AxiosResponse<GetUserFollowingsResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/profile/followings',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      proj,
      userID
    }
  };

  return axios.request<GetUserFollowingsResponse>(config);
}
