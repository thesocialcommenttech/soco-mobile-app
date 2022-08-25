import { PostType } from '../post';

interface Work {
  blog?: string[];
  artwork?: string[];
  skill?: string[];
  project?: string[];
  presentation?: string[];
  link?: string[];
  article?: string[];
}
interface Portfolio {
  social_accounts?: {};
  work?: Work;
  experience?: string[];
  education?: string[];
  skill?: string[];
  certifications?: string[];
}

interface NotificationAchievementPosts {
  views?: boolean;
  likes?: boolean;
  published?: boolean;
}
interface NotificationAchievement {
  posts?: NotificationAchievementPosts;
  followers?: boolean;
}
interface Notification {
  achievement?: NotificationAchievement;
  newsletter?: boolean;
}

interface Wallet {
  current_financial_year_balance?: number;
  balance?: number;
  wallet_id?: string;
  rzp_contact_id?: string;
}

export interface PostTypeState {
  postType: PostType;
  totalPosts: number;
}

export interface User {
  address?: Record<string, any>;
  portfolio?: Portfolio;
  notification?: Notification;
  achievements?: Record<string, any>;
  wallet?: Wallet;
  profileImage?: string;
  coverImage?: string;
  followers?: number;
  following?: number;
  portfolioLock?: string;
  posts?: string[];
  bio?: string;
  caption?: string;
  onboard?: boolean;
  vdOnBoard?: boolean;
  favourites?: number;
  detected_skills?: string[];
  kyc?: boolean;
  premium?: boolean;
  email_verified?: boolean;
  premium_validity_timestamp?: Date | string;
  interested_categories?: string[];
  _id?: string;
  name?: string;
  phone?: number;
  password?: string;
  username?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  academics?: string;
  joinedOn?: string;
  referalCode?: string;
  __v?: number;
  online?: boolean;
  totalPosts?: number;
  totalViews?: number;
  favouritePostsCount: number;
  followerUsersCount: number;
  followingUsersCount: number;
  postTypes: PostTypeState[];
}

export interface GetUserDataResponse {
  success?: boolean;
  user?: User;
  following?: boolean;
}
