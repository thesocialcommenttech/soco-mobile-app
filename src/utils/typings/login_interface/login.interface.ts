export interface User {
  _id: string;
  name?: string;
  email?: string;
  username?: string;
  profileImage?: string;
}

export interface LoginRequestData {
  email?: string;
  password?: string;
}

export interface LoginResponseData {
  message(arg0: string, message: any);
  success?: boolean;
  user?: User;
  token?: string;
}
