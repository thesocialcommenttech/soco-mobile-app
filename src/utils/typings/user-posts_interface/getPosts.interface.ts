import { PostType } from '../post';

interface Posts {
  aim?: string;
  comments?: number;
  downvotes?: number;
  featureImage?: string;
  postType?: PostType;
  postedBy?: string;
  postedOn?: string;
  title?: string;
  _id?: string;
  shares?: number;
  upvotes?: number;
  views?: number;
}

export interface GetPostsResponse {
  posts?: Posts[];
  success?: boolean;
}
