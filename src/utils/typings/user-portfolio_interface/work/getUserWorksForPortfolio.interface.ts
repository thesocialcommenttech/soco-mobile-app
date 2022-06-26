interface Post {
  featureImage: string;
  title: string;
  _id: string;
  postedOn: Date;
}

export interface GetUserWorksForPortfolioResponse {
  posts: Post[];
  success: boolean;
}
