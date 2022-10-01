import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  UpdateArticleRequest,
  UpdateArticleResponse
} from '~/src/utils/typings/works_interface/article/updateArticle.interface';

export function updateArticle(
  postID: string,
  {
    contentJSON,
    contentText,
    title,
    postStatus,
    featureImage,
    tags,
    category,
    updatedOn
  }: UpdateArticleRequest
): Promise<AxiosResponse<UpdateArticleResponse>> {
  const config: AxiosRequestConfig = {
    url: `https://thesocialcomment-backend-test.herokuapp.com/user/post/update/article/${postID}`,
    method: 'POST',
    data: {
      contentJSON,
      contentText,
      title,
      postStatus,
      featureImage,
      tags,
      category,
      updatedOn
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return axios.request<UpdateArticleResponse>(config);
}
