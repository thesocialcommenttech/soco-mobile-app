import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserProfileCompletionResponse } from '../../typings/user-profile_interface/getUserProfileCompletion.interface';

export function getUserProfileCompletion():Promise<AxiosResponse<GetUserProfileCompletionResponse>>{
    const config:AxiosRequestConfig = {
        url:"/user/profile/profile-completion",
        method:"GET",
        headers: {
            'Content-Type': 'application/json'
          }
    };

    return axios.request<GetUserProfileCompletionResponse>(config);
}