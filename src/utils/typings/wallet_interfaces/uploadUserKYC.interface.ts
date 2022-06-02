import { File } from '@babel/types';

export interface UploadUserKYCRequest {
  name?: string;
  pan_number?: string;
  dob?: Date;
  pan_front_image?: File;
  pan_back_image?: File;
  // pan_back_image?:File;
}

interface Data {
  dob?: string;
  name?: string;
  pan_back_image?: string;
  pan_front_image?: string;
  pan_number?: string;
  type?: string;
}
interface Kyc {
  data?: Data;
  status?: string;
  status_updated_at?: string;
  timestamp?: Date;
  user?: string;
}
export interface UploadUserKYCResponse {
  kyc?: Kyc;
  success?: boolean;
}
