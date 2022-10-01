import { Post } from '../post';

export interface GetDiscoveredUsersRequest {
  pageNo?: number;
  proj?: string;
  size?: number;
  type?: string;
}

interface PostedBy {
  name?: string;
  profileImage?: string;
  username?: string;
  _id?: string;
}

export interface DiscoveredPost {
  comments?: number;
  downvotes?: number;
  upvotes?: number;
  views?: number;
  featureImage?: string;
  postType?: string;
  postedBy?: PostedBy;
  postedOn?: Date;
  shares?: number;
  title?: string;
  _id?: string;
}

export interface GetDiscoveredPostsResponse {
  posts?: Post[];
  success?: boolean;
}
