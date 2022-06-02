import { File } from '@babel/types';

export interface UpdateArtworkRequest {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string[];
  artwork?: File;
  postedOn?: string;
  postStatus?: string;
}

export interface UpdateArtworkResponse {
  success?: boolean;
}
