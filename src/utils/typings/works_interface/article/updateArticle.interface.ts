import { File } from "@babel/types";

export interface UpdateArticleRequest{
    contentJSON?:[{
        insert?:string;
    }];
    contentText?:string;
    title?:string;
    postStatus?:string;
    featureImage?:File;
    tags?:string[];
    category?:string[];
    updatedOn?:string
}

export interface UpdateArticleResponse{
    postId?:string;
    success?:boolean;
    uploadedFeatureImage?:string;
}