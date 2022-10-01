export interface Interests {
  category?: string;
  _id?: string;
  index?: number;
}

export interface GetInterestCategoriesResponse {
  success?: boolean;
  interest_categories?: Interests[];
}
