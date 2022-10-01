import { Post, PostStatus, PostType, SharedPost } from '../post';

export interface GetPostsResponse {
  posts: Post[];
  totalPosts?: number;
  totalPages?: number;
  pageNo?: number;
  success: boolean;
}

export interface GetPostsOfTypeRequestData {
  userID: string;
  projection: string;
  postType: PostType;
  postStatus?: PostStatus;
}
export interface GetPostsOfTypeResponse {
  posts: Exclude<Post, SharedPost>[];
  success: boolean;
}
