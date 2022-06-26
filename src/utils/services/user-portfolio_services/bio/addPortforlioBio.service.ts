import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AddPortforlioBioRequest, AddPortforlioBioResponse } from '../../../typings/user-portfolio_interface/bio/addPortforlioBio.interface';

export function addPortforlioBio({
  bio
}: AddPortforlioBioRequest): Promise<
  AxiosResponse<AddPortforlioBioResponse>
> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/portfolio/add/bio`,
    method: 'POST',
    data: { bio }
  };

  return axios.request<AddPortforlioBioResponse>(config);
}
