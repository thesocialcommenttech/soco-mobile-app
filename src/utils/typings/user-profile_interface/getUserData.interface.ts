interface Work{
    blog:string[];
    artwork:string[];
    skill:string[];
    project:string[];
    presentation:string[];
    link:string[];
    article:string[];
}
interface Portfolio {
    social_accounts:{},
    work:Work;
    experience:string[];
    education:string[];
    skill:string[];
    certifications:string[]
}

interface Posts{
    views:boolean,
    likes:boolean,
    published:boolean
};
interface NotificationAchievement{
    posts:Posts;
    followers:boolean
};
interface Notification{
    achievement:NotificationAchievement
}

interface Wallet{
    current_financial_year_balance:number;
    balance:number;
    wallet_id:string
}

interface User{
    address:{};
    portfolio:Portfolio;
    notification:Notification;
    achievements:{};
    wallet:Wallet;
    profileImage:string;
    coverImage:string;
    followers:number;
    following:number;
    portfolioLock:string;
    posts:string[];
    onboard:boolean;
    vdOnBoard:boolean;
    favourites:number;
    detected_skills:string[];
    kyc:boolean;
    premium:boolean;
    email_verified:boolean;
    interested_categories:string[];
    _id:string;
    name:string;
    password:string;
    username:string;
    email:string;
    dateOfBirth:string;
    gender:string;
    academics:string;
    joinedOn:string;
    referalCode:string;
    __v:number;
    online:boolean;
    totalPosts:number;
    totalViews:number;
}

export interface GetUserDataResponse {
    success:boolean;
    user:User;
    following:boolean
}