import { File } from '@babel/types';
export interface PostCreateArtworkRequest {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string[];
  artwork?: File;
  postedOn?: string;
  postStatus?: string;
}

interface Artwork {
  title?: string;
  _id?: string;
}

export interface PostCreateArtworkResponse {
  artwork?: Artwork;
  success?: boolean;
}
