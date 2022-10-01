import { User } from '../login_interface/login.interface';

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
  user?: User;
  token?: string;
}
