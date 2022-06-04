import { File } from '@babel/types';

export interface AddPortforlioCertificationRequest {
  title: string;
  issue_date: Date;
  credential_id: string;
  issuer_organization: string;
  credential_url: string;
  do_expire: boolean;
  certimage: File;
}

interface Certification {
  certification_image_url: string;
  credential_id: string;
  credential_url: string;
  do_expire: string;
  issue_date: Date;
  issuer_organization: string;
  title: string;
}

export interface AddPortforlioCertificationResponse {
  certification: Certification;
  success: boolean;
}
