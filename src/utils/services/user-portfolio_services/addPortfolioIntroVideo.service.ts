import axios, { AxiosRequestConfig } from 'axios';
import { FileObject } from '../../typings/file';
import { AddPortfolioIntroVideoResponse } from '../../typings/user-portfolio_interface/addPortfolioIntroVideo.interface';

export function addPortfolioIntroVideo(introvideo: FileObject) {
  const form = new FormData();
  form.append('introvideo', introvideo);

  const config: AxiosRequestConfig = {
    url: '/user/portfolio/add/intro-video',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<AddPortfolioIntroVideoResponse>(config);
}
