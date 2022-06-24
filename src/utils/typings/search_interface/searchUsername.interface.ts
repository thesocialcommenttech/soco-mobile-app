interface User {
  name?: string;
  profileImage?: string;
  username?: string;
  _id?: string;
}

export interface SearchUsernameResponse {
  result?: User[];
  success?: boolean;
}
