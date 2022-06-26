import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetDiscoveredUsersRequest, GetDiscoveredUsersResponse } from '../../typings/getDiscoveredUsers_interface/getDiscoveredUsers.interface';

export function getDiscoveredUsers({
  pageNo, proj, size, type
}: GetDiscoveredUsersRequest): Promise<
  AxiosResponse<GetDiscoveredUsersResponse>
> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/discover',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { pageNo, proj, size, type }
  };

  return axios.request<GetDiscoveredUsersResponse>(config);
}
