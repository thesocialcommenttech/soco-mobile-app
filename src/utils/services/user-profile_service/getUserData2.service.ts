import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserData2Response } from '../../typings/user-profile_interface/getUserData2.interface';

export function getUserData2(
  username: string
): Promise<AxiosResponse<GetUserData2Response>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/profile/2/${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      projection:
        'name email email_verified coverImage onboard isFollowing totalViews totalPosts postTypes.postType postTypes.totalPosts favouritePostsCount followerUsersCount followingUsersCount profileImage caption timelineTextureImage username bio portfolioLock premium'
    }
  };

  return axios.request<GetUserData2Response>(config);
}
