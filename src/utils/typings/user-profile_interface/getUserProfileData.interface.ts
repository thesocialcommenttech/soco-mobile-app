interface Post{
    likes:boolean;
    published:boolean;
    views:boolean;
}

interface Achievement{
    followers:boolean;
    post:Post;
};

interface Notification{
    achievement:Achievement;
};

interface UserData{
    notification:Notification;
    _id:string;
}

export interface GetUserProfileDataResponse{
    success:boolean;
    userData:UserData;
}