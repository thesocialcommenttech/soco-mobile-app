export interface SearchedUser {
  name?: string;
  profileImage?: string;
  username?: string;
  _id?: string;
}

export interface SearchUsernameResponse {
  result?: SearchedUser[];
  success?: boolean;
}
