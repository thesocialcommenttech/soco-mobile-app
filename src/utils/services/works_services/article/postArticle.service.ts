import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  PostArticleRequest,
  PostArticleResponse
} from '~/src/utils/typings/works_interface/article/postArticle.interface';

export function postArticle(
  postStatus: PostArticleRequest
): Promise<AxiosResponse<PostArticleResponse>> {
  const config: AxiosRequestConfig = {
    url: 'https://thesocialcomment-backend-test.herokuapp.com/user/post/create/article',
    method: 'POST',
    data: postStatus,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<PostArticleResponse>(config);
}
