import { File } from "@babel/types";

interface ContentIndex0 {
  _id?: string;
  type?: string;
  attributes?: {};
  data?: {
    heading?: string;
  };
};

interface ContentIndex1 {
  _id?: string;
  type?: string;
  attributes?: {};
  data?: {
    content?: {
      ops?: [
        {
          insert?: string;
        }
      ];
    };
  };
};

interface ContentIndex2 {
  _id?: string;
  type?: string;
  attributes?: {};
  data?: {
    pdf?: string;
    description?: string;
  };
};

interface ContentIndex3 {
  _id?: string;
  type?: string;
  attributes?: {};
  data?: {
    video?: string;
  };
};

interface ContentIndex4 {
  _id?: string;
  type?: string;
  attributes?: {};
  data?: {
    code?: string;
  };
};

export interface PostCreateProjectRequest {
  title?: string;
  team?: string;
  introduction?: string;
  aim?: string;
  tags?: string[];
  content?: [
    ContentIndex0,
    ContentIndex1,
    ContentIndex2,
    ContentIndex3,
    ContentIndex4
  ];
  featureImage?:File;
  postedOn?:string;
  updatedOn?:string;
  postStatus?:string;
  files?: File;
};

interface Post{
    _id?:string;
    title?:string
}

export interface PostCreateProjectResponse{
    post?:Post;
    success?:boolean
};

