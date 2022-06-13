import { File } from '@babel/types';

export interface PostLinkRequest {
  title: string;
  description: string;
  featureImage: File;
  tags: string[];
  link: string;
  postedOn: Date;
  postStatus: string;
};

export interface PostLinkResponse{
    link: Pick<PostLinkRequest, ("link" | "title")>;
    _id:string;
    success:boolean
};


