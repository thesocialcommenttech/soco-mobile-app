export interface GetPortforlioProfileDataRequest {
  username?: string;
}

interface Data {
  academics?: string;
  dateOfBirth?: Date;
  detected_skills?: string[];
  email?: string;
  name?: string;
  phone?: number;
  portfolioLock?: string;
  profileImage?: string;
  premium?: boolean;
  username?: string;
  _id?: string;
}

export interface GetPortforlioProfileDataResponse {
  data?: Data;
  success?: boolean;
}
