import { FileObject } from '../../file';
import { SkillVideoPost } from '../../post';
export interface PostCreateSkillRequest {
  title: SkillVideoPost['title'];
  description: SkillVideoPost['description'];
  tags: SkillVideoPost['tags'];
  category: SkillVideoPost['category'];
  video: FileObject;
  featureImage: FileObject;
  postedOn: SkillVideoPost['postedOn'];
  postStatus: SkillVideoPost['postStatus'];
  updatedOn: SkillVideoPost['updatedOn'];
}

export interface PostCreateSkillResponse {
  post?: Pick<SkillVideoPost, '_id' | 'title'>;
  success?: boolean;
}
