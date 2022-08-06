import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  RegisterRequest,
  RegisterResponse,
  SubcriptionsPlan
} from '../../typings/register_interfaces/register.interfce';

export function register(
  data: RegisterRequest,
  premium?: boolean = false,
  subscriptionPlan?: SubcriptionsPlan
): Promise<AxiosResponse<RegisterResponse>> {
  const config: AxiosRequestConfig = {
    url: 'user/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
    params: { premium, subscriptionPlan }
  };
  return axios.request<RegisterResponse>(config);
}
