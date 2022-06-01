export interface PostSharedRequest{
    description:string;
    sharedPostID:string;
    sharedPostType:string;
    postedOn:Date;
}

interface Share{
    _id:string
};

export interface PostSharedResponse{
    share:Share;
    success:boolean;
}