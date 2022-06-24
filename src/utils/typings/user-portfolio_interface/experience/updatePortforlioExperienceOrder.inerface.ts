interface Exp{
    order:number;
    _id:string;
}

export interface UpdatePortforlioExperienceOrderRequest{
    experienceOrder:Exp[]; 
};

export interface UpdatePortforlioExperienceOrderResponse{
    success:boolean
}