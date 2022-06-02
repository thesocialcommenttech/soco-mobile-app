import { File } from "@babel/types";
export interface PostCreateSkillRequest{
    title?:string;
    description?:string;
    tags?:string[];
    category?:string[];
    video?:File;
    featureImage?:File;
    postedOn?:string;
    postStatus?:string;
    updatedOn?:string;
};

interface Skill{
    title?:string;
    _id?:string
}

export interface PostCreateSkillResponse{
    post?:Skill;
    success?:boolean;
}