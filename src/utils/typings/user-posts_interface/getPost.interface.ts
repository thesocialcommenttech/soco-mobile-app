interface By {
  name: string;
  profileImage: string;
  username: string;
  _id: string;
}

interface Comment {
  by: By;
  comment: string;
}

interface PostedBy {
  bio: string;
  name: string;
  profileImage: string;
  username: string;
  _id: string;
}

interface Post {
  comments: Comment[];
  contentJSON: [{ insert: string }];
  downvotes: string[];
  isFavorited: boolean;
  isFollowingAuthor: boolean;
  postedBy: PostedBy;
  postedOn: Date;
  shares: number;
  tags: string[];
  title: string;
  upvotes: string[];
  voted: string;
  _id: string;
  views: number;
}

export interface GetPostResponse {
  success: boolean;
  post: Post;
}
