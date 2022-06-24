import { File } from '@babel/types';

export interface UpdatePresentationRequest {
  title?: string;
  tags?: string[];
  description?: string;
  featureImage?: File;
  slides?: File;
  totalSlides?:number;
  postedOn?:Date;
  updatedOn?:Date;
  postStatus?:string;
};

interface SlideInfo{
    slideUrl?:string;
    position?:number;
};

export interface UpdatePresentationResponse{
    success?:boolean;
    slides?: SlideInfo[];
    uploadedFeatureImage?:string;
}
