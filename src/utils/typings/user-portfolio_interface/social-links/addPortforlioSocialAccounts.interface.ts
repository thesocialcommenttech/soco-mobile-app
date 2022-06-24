export interface Social_accounts{
    facebook:string|null;
    github:string|null;
    instagram:string|null;
    linkedin:string|null;
    twitter:string|null;
};

export interface AddPortforlioSocialAccountsResponse{
    social_accounts:Social_accounts;
    success:boolean;
};