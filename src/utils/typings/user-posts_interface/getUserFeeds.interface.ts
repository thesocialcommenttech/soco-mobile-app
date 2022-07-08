interface PostedBy {
  name: string;
  profileImage: string;
  username: string;
  _id: string;
}

interface Feed {
  comments: number;
  description: string;
  downvotes: number;
  featureImage: string;
  postType: string;
  postedBy: PostedBy;
  postedOn: Date;
  shares: string;
  title: string;
  _id: string;
  upvotes: number;
  views: number;
}

export interface getUserFeedsResponse {
  followingCount: number;
  feeds: Feed[];
  success: boolean;
}
