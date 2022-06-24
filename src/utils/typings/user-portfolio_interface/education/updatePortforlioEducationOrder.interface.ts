interface Education{
    _id:string;
    order:number;
};

export interface UpdatePortforlioEducationOrderRequest{
    order:Education[];
};

export interface UpdatePortforlioEducationOrderResponse{
    success:boolean;
}