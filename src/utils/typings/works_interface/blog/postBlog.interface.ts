export interface PostBlogRequest{
    postStatus:string;
};

interface Blog{
    title:string;
    _id:string
}

export interface PostBlogResponse{
    blog: Blog;
    success:boolean;
};