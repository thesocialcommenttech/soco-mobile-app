import { FileObject } from '../../file';
import { ICertification } from '../getPortforlioWorkData.interface';

export interface AddPortforlioCertificationRequest {
  title?: string;
  issue_date?: string;
  credential_id?: string;
  issuer_organization?: string;
  expiration_date?: string;
  credential_url?: string;
  do_expire?: boolean;
  certimage?: FileObject | string;
}

export interface AddPortforlioCertificationResponse {
  certification?: ICertification;
  success?: boolean;
}
