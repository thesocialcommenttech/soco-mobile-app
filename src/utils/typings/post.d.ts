import { User } from './user-profile_interface/getUserData.interface';

export type PostType =
  | 'blog'
  | 'artwork'
  | 'skill'
  | 'presentation'
  | 'project'
  | 'link'
  | 'shared'
  | 'article';

type PostedBy = Pick<
  User,
  '_id' | 'name' | 'username' | 'bio' | 'profileImage'
>;

interface PostComment {
  by: PostedBy;
  comment: string;
}

type PostStatus = 'draft' | 'published' | 'trash';

type PostVoteType = 'up' | 'down';

interface CommonPostData {
  _id?: string;
  postedBy?: PostedBy;
  postedOn?: Date | string;
  updatedOn?: Date;
  publishedOn?: Date;
  postType?: PostType;
  postStatus?: PostStatus;
  title?: string;
  featureImage?: string;
  tags?: string[];
  views?: number;
  upvotes?: number;
  downvotes?: number;
  comments?: number;
  shares?: number;
  voted?: PostVoteType;
  isFavorited?: boolean;
  isFollowingAuthor?: boolean;
}

export interface BlogPost extends CommonPostData {
  postType: 'blog';
  contentJSON: Record<string, any>;
  contentText: string;
  description: string;
  category: string[];
}

export interface ArticlePost extends BlogPost {
  postType: 'article';
  description: string;
}

export interface ArtworkPost extends CommonPostData {
  postType: 'artwork';
  description: string;
  category: string[];
}

export interface PresentationPost extends CommonPostData {
  postType: 'presentation';
  description: string;
  slides: {
    slideUrl: string;
    position: number;
  }[];
  totalSlides: number;
}

export interface ProjectPost extends CommonPostData {
  introduction: string;
  postType: 'project';
  team: string[];
  aim: string;
  content: any[];
}
export interface SharedPost {
  _id?: string;
  postedBy: PostedBy;
  postedOn: Date;
  postType: 'shared';
  postStatus: PostStatus;
  description: string;
  sharedPost: Post;
}

export interface SkillVideoPost extends CommonPostData {
  postType: 'skill';
  video: string;
  description: string;
  category: string[];
}

export type Post =
  | BlogPost
  | ArticlePost
  | ArtworkPost
  | PresentationPost
  | ProjectPost
  | SharedPost
  | SkillVideoPost;
