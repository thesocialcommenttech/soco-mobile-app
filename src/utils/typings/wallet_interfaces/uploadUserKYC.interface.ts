import { FileObject } from '../file';
import { Kyc } from './getUserKYC.interface';

export interface UploadUserKYCRequest {
  name: string;
  pan_number: string;
  dob: string;
  pan_front_image: FileObject | string;
  pan_back_image: FileObject | string;
}

export interface UploadUserKYCResponse {
  kyc?: Kyc;
  success?: boolean;
}
