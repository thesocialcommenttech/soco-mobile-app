import { File } from '@babel/types';

export interface UpdateLinkRequest {
  title: string;
  description: string;
  featureImage: File;
  tags: string[];
  link: string;
  postedOn: Date;
  postStatus: string;
}
export interface UpdateLinkResponse {
  postId: string;
  uploadedFeatureImage: string;
  success: boolean;
}
