import { FileObject } from '../../file';
import { ArtworkPost } from '../../post';
export interface PostCreateArtworkRequest {
  title: ArtworkPost['title'];
  description: ArtworkPost['description'];
  tags: ArtworkPost['tags'];
  category: ArtworkPost['category'];
  artwork: FileObject;
  postedOn: ArtworkPost['postedOn'];
  postStatus: ArtworkPost['postStatus'];
}

export interface PostCreateArtworkResponse {
  artwork?: Pick<ArtworkPost, '_id' | 'title'>;
  success?: boolean;
}
