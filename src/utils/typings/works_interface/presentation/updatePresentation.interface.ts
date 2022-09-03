import { FileObject } from '../../file';
import { PresentationPost } from '../../post';

export interface PostPresentationRequest {
  title: PresentationPost['title'];
  tags: PresentationPost['tags'];
  description: PresentationPost['description'];
  featureImage: FileObject;
  slides: FileObject[];
  totalSlides: PresentationPost['totalSlides'];
  postedOn: PresentationPost['postedOn'];
  updatedOn: PresentationPost['updatedOn'];
  postStatus: PresentationPost['postStatus'];
}

interface SlideInfo {
  slideUrl?: string;
  position?: number;
}

export interface UpdatePresentationResponse {
  success?: boolean;
  slides?: SlideInfo[];
  uploadedFeatureImage?: string;
}
