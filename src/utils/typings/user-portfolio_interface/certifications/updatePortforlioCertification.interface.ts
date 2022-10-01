import { FileObject } from '../../file';
import { ICertification } from '../getPortforlioWorkData.interface';

export interface UpdatePortforlioCertificationRequest {
  certification: {
    title?: string;
    issue_date?: string;
    credential_id?: string;
    issuer_organization?: string;
    credential_url?: string;
    do_expire?: boolean;
    certimage?: FileObject | string;
  };
  indexID: string;
}

// interface Certification {
//   certification_image_url?: string;
//   credential_id?: string;
//   credential_url?: string;
//   do_expire?: boolean;
//   issue_date?: Date;
//   issuer_organization?: string;
//   title?: string;
//   _id?: string;
// }

export interface UpdatePortforlioCertificationResponse {
  certification?: ICertification;
  success?: boolean;
}
