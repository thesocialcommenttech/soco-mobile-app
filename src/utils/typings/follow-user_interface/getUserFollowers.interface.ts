export interface GetUserFollowersRequest {
  proj: string;
  userID: string;
}

interface Follower {
  name: string;
  profileImage: string;
  username: string;
  _id: string;
}

export interface GetUserFollowersResponse {
  followers: Follower[];
  success: boolean;
}
