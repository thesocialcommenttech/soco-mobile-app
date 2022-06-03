import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserFavouritesRequest,  GetUserFavouritesResponse} from '../../typings/user-profile_interface/getUserFavourites.interface';

export function getUserFavourites(
  {proj, userID}:GetUserFavouritesRequest
): Promise<AxiosResponse<GetUserFavouritesResponse>> {
  const config: AxiosRequestConfig = {
    url: `/user/profile/favourites`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data:{proj, userID}
  };

  return axios.request<GetUserFavouritesResponse>(config);
}
