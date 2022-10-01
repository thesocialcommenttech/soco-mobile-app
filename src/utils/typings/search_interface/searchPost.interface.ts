import { PostType } from '../post';

interface PostedBy {
  name?: string;
  profileImage?: string;
  username?: string;
  _id?: string;
}

export interface SearchedPost {
  postType?: PostType;
  postedBy?: PostedBy;
  title?: string;
  _id?: string;
}

export interface SearchPostResponse {
  result?: SearchedPost[];
  success?: boolean;
}
