interface PostedBy{
    name:string;
    profileImage:string;
    username:string;
    _id:string;
};

interface Post{
    postType:string;
    postedBy:PostedBy;
    title:string;
    _id:string;
};

export interface SearchPostResponse{
    result: Post[];
    success:boolean;
}