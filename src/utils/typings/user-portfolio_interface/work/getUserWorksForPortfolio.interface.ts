import { LinkPost, Post, SharedPost } from '../../post';

export interface GetUserWorksForPortfolioResponse {
  posts?: Pick<
    Exclude<Post, LinkPost | SharedPost>,
    '_id' | 'title' | 'featureImage'
  >[];
  success?: boolean;
}
