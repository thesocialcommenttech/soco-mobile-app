import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import produce from 'immer';
import { FileObject } from '~/src/utils/typings/file';
import {
  PostPresentationRequest,
  UpdatePresentationResponse
} from '~/src/utils/typings/works_interface/presentation/updatePresentation.interface';

export function updatePresentation(
  data: PostPresentationRequest,
  postID: string
) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (['tags', 'category'].includes(key) && value) {
      form.append(key, JSON.stringify(value));
      return;
    }

    if (key === 'slides' && value) {
      value.forEach((file: PostPresentationRequest['slides'][0], i) => {
        if (typeof file === 'object') {
          file = produce(file, draft => {
            draft.name = `${i}_${draft.name}`;
          });
        }
        form.append(key, file);
      });
      return;
    }

    if (typeof value === 'boolean' || value) {
      form.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    url: `/user/post/update/presentation/${postID}`,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form
  };

  return axios.request<UpdatePresentationResponse>(config);
}
