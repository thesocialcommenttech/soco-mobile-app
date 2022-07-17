import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  GetDiscoveredUsersRequest,
  GetDiscoveredPostsResponse
} from '../../typings/getDiscoveredUsers_interface/getDiscoveredUsers.interface';

export function getDiscoveredPosts({
  pageNo,
  proj,
  size,
  type
}: GetDiscoveredUsersRequest): Promise<
  AxiosResponse<GetDiscoveredPostsResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'user/discover',
    method: 'POST',
    data: { pageNo, proj, size, type }
  };

  return axios.request<GetDiscoveredPostsResponse>(config);
}
