export interface GetPortforlioWorkDataRequest {
  username?: string;
}

interface Certifications {
  certification_image_url?: string;
  credential_id?: string;
  credential_url?: string;
  issue_date?: string;
  issuer_organization?: string;
  title?: string;
  _id?: string;
  do_expire?: boolean;
}

interface Education {
  course?: string;
  institute?: string;
  level?: string;
  passYear?: Date;
  index?: number;
  order?: number;
  status?: string;
  _id?: string;
}

interface Experience {
  company?: string;
  description?: string;
  from?: Date;
  index?: number;
  order?: number;
  ongoing?: boolean;
  to?: Date;
  title?: string;
  _id?: string;
}

interface Skill {
  level?: number;
  skill?: string;
  _id?: string;
}

interface Social_Accounts {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

interface Post {
  featureImage?: string;
  postType?: string;
  title?: string;
  _id?: string;
}

interface Work {
  article?: Post[];
  artwork?: Post[];
  blog?: Post[];
  presentation?: Post[];
  project?: Post[];
  skill?: Post[];
  link?: Post[];
}

interface Data {
  bio?: string;
  certifications?: Certifications[];
  education?: Education[];
  experience?: Experience[];
  intro_video_url?: string;
  skill?: Skill[];
  social_accounts?: Social_Accounts;
  work?: Work;
}

export interface GetPortforlioWorkDataResponse {
  success?: boolean;
  data?: Data;
}
