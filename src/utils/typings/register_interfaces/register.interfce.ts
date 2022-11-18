import { User } from '../user-profile_interface/getUserData.interface';

export interface RegisterAccountData {
  name: string;
  username: string;
  email: string;
  password: string;
  agreement: boolean;
  referal?: string;
}

export interface RegisterPersonalData {
  academic: string;
  dob: string | Date | number;
  gender: string;
  city?: string;
  pincode?: string;
  state?: string;
}

export type RegisterRequest = RegisterAccountData & RegisterPersonalData;

export enum SubcriptionsPlan {
  premium2999 = 'premium2999',
  premium1000 = 'premium1000'
}

export interface RegisterResponse {
  success?: boolean;
  user?: Required<
    Pick<User, '_id' | 'name' | 'email' | 'username' | 'profileImage'>
  >;
  token?: string;
}
