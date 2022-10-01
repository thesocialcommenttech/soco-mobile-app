import { FileObject } from '../../file';
import { LinkPost } from '../../post';

export interface PostLinkRequest {
  title: LinkPost['title'];
  description?: LinkPost['description'];
  featureImage: FileObject;
  tags?: LinkPost['tags'];
  link: LinkPost['link'];
  postedOn: LinkPost['postedOn'];
  postStatus: LinkPost['postStatus'];
}

export interface PostLinkResponse {
  link: Pick<PostLinkRequest, 'link' | 'title'>;
  _id: string;
  success: boolean;
}
