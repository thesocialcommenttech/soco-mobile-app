import { PostCreateArtworkRequest } from './postArtwork.interface';

export type UpdateArtworkRequest = Pick<
  PostCreateArtworkRequest,
  'title' | 'postStatus' | 'postedOn'
> &
  Partial<
    Pick<
      PostCreateArtworkRequest,
      'description' | 'category' | 'tags' | 'artwork'
    >
  >;

export interface UpdateArtworkResponse {
  success?: boolean;
}
