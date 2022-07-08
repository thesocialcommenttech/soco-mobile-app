import { User } from '../login_interfaces/login.interfce';

export interface RegisterReqeust {
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
