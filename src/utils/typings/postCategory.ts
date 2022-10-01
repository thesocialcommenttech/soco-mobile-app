import { PostType } from './post';

export interface Category {
  name: string;
  subCategory: string[];
}

export interface PostCategory {
  category: Category[];
  type: PostType;
  _id: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  categories: PostCategory;
}
