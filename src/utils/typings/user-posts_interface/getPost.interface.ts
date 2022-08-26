import { Post } from '../post';

export interface GetPostRequest {
  postType: Post['postType'];
  postID: Post['_id'];
  projection: string;
  edit?: boolean;
}

export interface GetPostResponse<T> {
  success: boolean;
  post: Omit<T, 'upvotes' | 'downvotes' | 'comments'> & {
    upvotes: any[];
    downvotes: any[];
    comments: any[];
  };
}
