import { LinkPost, Post, SharedPost } from '../../post';

export interface SetPortforlioWorkDataRequest {
  postType: Post['postType'];
  postsList: Post['_id'][];
}

export interface SetPortforlioWorkDataResponse {
  posts?: Pick<
    Exclude<Post, LinkPost | SharedPost>,
    '_id' | 'title' | 'featureImage' | 'postType'
  >[];
  success?: boolean;
}
