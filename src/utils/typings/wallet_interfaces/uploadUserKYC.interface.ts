import { FileObject } from '../file';
import { Kyc } from './getUserKYC.interface';

export interface UploadUserKYCRequest {
  name?: string;
  pan_number?: string;
  dob?: Date;
  pan_front_image?: FileObject;
  pan_back_image?: FileObject;
}

export interface UploadUserKYCResponse {
  kyc?: Kyc;
  success?: boolean;
}
