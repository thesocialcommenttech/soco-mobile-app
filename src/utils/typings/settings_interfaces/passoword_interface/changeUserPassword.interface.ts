export interface ChangeUserPasswordRequest{
    newPassword?:string;
    oldPassword?:string;
}

export interface ChangeUserPasswordResponse{
    success?:boolean;
}