export interface GetUserFavouritesRequest {
  proj?: string;
  userID?: string;
}

interface PostedBy {
  name?: string;
  profileImage?: string;
  username?: string;
  _id?: string;
}

interface Post {
  comments?: number;
  downvotes?: number;
  featureImage?: string;
  postType?: string;
  postedBy?: PostedBy;
  postedOn?: Date;
  shares?: 1;
  title?: string;
  upvotes?: number;
  views?: number;
  _id?: string;
}

export interface GetUserFavouritesResponse {
  favourites?: Post[];
  favouritesCount?: number;
  success?: boolean;
  userName?: string;
}
