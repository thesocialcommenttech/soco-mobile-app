import {
  ArticlePost,
  ArtworkPost,
  BlogPost,
  LinkPost,
  PresentationPost,
  ProjectPost,
  SkillVideoPost
} from '../post';

export interface ICertification {
  certification_image_url?: string;
  credential_id?: string;
  credential_url?: string;
  issue_date?: Date | string;
  expire_date?: Date | string;
  issuer_organization?: string;
  title?: string;
  _id?: string;
  do_expire?: boolean;
}

export interface IEducation {
  course?: string;
  institute?: string;
  level?: string;
  passYear?: Date | 'completed';
  index?: number;
  order?: number;
  status?: string;
  _id?: string;
}

export interface Experience {
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

export interface ISkill {
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

// interface Post {
//   featureImage?: string;
//   postType?: string;
//   title?: string;
//   _id?: string;
// }

export interface Work {
  article?: ArticlePost[];
  artwork?: ArtworkPost[];
  blog?: BlogPost[];
  presentation?: PresentationPost[];
  project?: ProjectPost[];
  skill?: SkillVideoPost[];
  link?: LinkPost[];
}

export interface PortfolioData {
  bio?: string;
  certifications?: ICertification[];
  education?: IEducation[];
  experience?: Experience[];
  intro_video_url?: string;
  skill?: ISkill[];
  social_accounts?: Social_Accounts;
  work?: Work;
}

export interface GetPortforlioWorkDataResponse {
  success?: boolean;
  data?: PortfolioData;
}
