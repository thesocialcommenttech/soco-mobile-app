import { File } from '@babel/types';

export interface AddPortfolioIntroVideoRequest {
  introvideo?: File;
}

export interface AddPortfolioIntroVideoResponse {
  intro_video_url?: string;
  success?: boolean;
}
