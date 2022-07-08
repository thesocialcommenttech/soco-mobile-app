export interface SetPortforlioWorkDataRequest {
  postType?: string;
  postList?: string[];
}

interface Post {
  featureImage?: string;
  postType?: string;
  title?: string;
  _id?: string;
}

export interface SetPortforlioWorkDataResponse {
  posts?: Post[];
  success?: boolean;
}
