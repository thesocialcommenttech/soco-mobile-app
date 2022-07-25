import { FileObject } from '../file';

export interface UpdateCoverRequest {
  coverImage?: FileObject;
}

export interface UpdateCoverResponse {
  success?: boolean;
  coverImageURL?: string;
}
