export interface LoginRequestData {
  email?: string;
  password?: string;
}

export interface LoginResponseData {
  success: boolean;
  user: {
    _id: string;
    name?: string;
    email?: string;
    username?: string;
    profileImage?: string;
  };
  token?: string;
}

export interface LoginErrorResponse {
  success: false;
  message?: string;
}
