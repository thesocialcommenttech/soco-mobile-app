interface PostID{
    _id?:string;
    postType?:string;
    title?:string;
};

interface UserID{
    _id?:string;
    username?:string;
    profileImage?:string;
    name?:string;
};

interface Data{
    links?:string[];
    postID?:PostID;
    userID?:UserID;
}

interface Read{
    data?:Data;
    notifiedOn?:string;
    type?:string;
    _id?:string;
}

interface Notifications{
    read?:[Read];
    unread?:[];
}


export interface GetNotificatiosnresponse{
    notifications?:Notifications;
    success?:boolean
}