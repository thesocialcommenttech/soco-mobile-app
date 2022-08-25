import { User } from '../user-profile_interface/getUserData.interface';

type KycStatus = 'pending' | 'accepted' | 'rejected';

type KycDocumentType = 'pan' | 'adhar';

export interface Kyc {
  user: User['_id'];
  status: KycStatus;
  message: string;
  status_updated_at: Date | string;
  data: {
    type: KycDocumentType;
    name: string;
    dob: Date | string;
    pan_number: string;
    pan_front_image: string;
    pan_back_image: string;
  };
  timestamp: Date | string;
}

export interface GetUserKYCResponse {
  success?: boolean;
  kyc: Kyc;
}
