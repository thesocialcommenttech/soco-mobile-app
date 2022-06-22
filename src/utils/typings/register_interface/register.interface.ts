import { User } from '../login_interface/login.interface';

export interface RegisterRequest {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  academic?: string;
  agreement?: boolean;
  dob?: string;
  gender?: string;
  city?: string;
  pincode?: string;
  referal?: string;
  state?: string;
}

export interface RegisterResponse {
  success?: boolean;
  user?: User;
  token?: string;
}
