export interface GetUserFollowingsRequest {
  proj: string;
  userID: string;
}

interface Following {
  name: string;
  profileImage: string;
  username: string;
  _id: string;
}

export interface GetUserFollowingsResponse {
  following: Following[];
  success: boolean;
}
