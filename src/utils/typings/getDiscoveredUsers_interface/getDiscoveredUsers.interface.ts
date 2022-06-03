export interface GetDiscoveredUsersRequest {
  pageNo: number;
  proj: string;
  size: number;
  type: string;
}

interface PostedBy {
  name: string;
  profileImage: string;
  username: string;
  _id: string;
}

interface Post {
  comments: number;
  downvotes: number;
  upvotes: number;
  views: number;
  featureImage: string;
  postType: string;
  postedBy: PostedBy;
  postedOn: Date;
  shares: number;
  title: string;
  _id: string;
}

export interface GetDiscoveredUsersResponse {
  posts: Post[];
  success: boolean;
}
