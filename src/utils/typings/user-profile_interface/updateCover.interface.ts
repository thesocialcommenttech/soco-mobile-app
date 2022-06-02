import { File } from '@babel/types';

export interface UpdateCoverRequest {
  cover?: File;
}

export interface UpdateCoverResponse {
  success?: boolean;
  coverImageURL?: string;
}
