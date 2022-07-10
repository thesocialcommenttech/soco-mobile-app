interface PostedBy {
  name?: string;
  profileImage?: string;
  username?: string;
  _id?: string;
}

export interface SearchedPost {
  postType?: string;
  postedBy?: PostedBy;
  title?: string;
  _id?: string;
}

export interface SearchPostResponse {
  result?: SearchedPost[];
  success?: boolean;
}
