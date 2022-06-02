import { File } from '@babel/types';

export interface UpdateSkillRequest {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  video?: File;
  featureImage?: File;
  postedOn?: string;
  postStatus?: string;
  updatedOn?: string;
}

export interface UpdateSkillResponse {
  success?: boolean;
}
