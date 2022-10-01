import axios, { AxiosRequestConfig } from 'axios';
import { useDeviceId } from '~/src/state/deviceIdState';
import { IncrementPostViewsResponse } from '../../typings/increment-postviews_interface/incrementPostviews.interface';
import { Post } from '../../typings/post';

export function incrementPostviews(postID: Post['_id']) {
  const deviceID = useDeviceId.getState().deviceId;

  const config: AxiosRequestConfig = {
    url: '/user/post/increment-view',
    method: 'GET',
    params: { postID, deviceID }
  };

  return axios.request<IncrementPostViewsResponse>(config);
}
