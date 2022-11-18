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
  updatedOn?: Date | string;
  publishedOn?: Date | string;
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
  contentJSON: Record<string, any>[];
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

interface ProjectTextBlock {
  _id: string;
  type: 'text';
  data: { content: { ops: any[] } };
}

interface ProjectHeadingBlock {
  _id: string;
  type: 'heading';
  data: { heading: string };
}

interface ProjectVideoBlock {
  _id: string;
  type: 'video';
  data: { video: string };
}

interface ProjectCodeBlock {
  _id: string;
  type: 'code';
  data: { code: string };
}
interface ProjectPdfBlock {
  _id: string;
  type: 'pdf';
  data: { pdf: string; description?: string };
}

export interface ProjectPost extends CommonPostData {
  introduction: string;
  postType: 'project';
  team: string[];
  aim: string;
  content: (
    | ProjectTextBlock
    | ProjectHeadingBlock
    | ProjectVideoBlock
    | ProjectCodeBlock
    | ProjectPdfBlock
  )[];
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
export interface LinkPost extends CommonPostData {
  postType: 'link';
  description: string;
  link: string;
}

export type Post =
  | BlogPost
  | ArticlePost
  | ArtworkPost
  | PresentationPost
  | ProjectPost
  | SharedPost
  | SkillVideoPost
  | LinkPost;
