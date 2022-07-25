import { Post, PostType } from '../post';

export interface GetPostsResponse {
  posts?: Post[];
  success?: boolean;
}
