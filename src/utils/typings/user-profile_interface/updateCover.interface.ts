import { File } from '@babel/types';

export interface UpdateCoverRequest {
  cover?: FormData;
}

export interface UpdateCoverResponse {
  success?: boolean;
  coverImageURL?: string;
}
