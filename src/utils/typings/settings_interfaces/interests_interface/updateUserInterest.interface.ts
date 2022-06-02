export interface UpdateUserInterestRequest {
  interest_categories?: string[];
}

interface InterestedCategories {
  _id?: string;
}

export interface UpdateUserInterestResponse {
  success?: boolean;
  interested_categories?: InterestedCategories[];
}
