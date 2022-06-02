interface Insert{
    insert?:string;
}

export interface UpdateBlogRequest{
    contentJSON?:[Insert];
    contentText?:string;
    title?:string;
    postStatus?:string;
    updatedOn?:Date;
}

export interface UpdateBlogResponse{
    postId?:string;
    success?:boolean;
}