import { RouteProp } from '@react-navigation/native';

export type MyStackPrams = {
  App: {};
  Search: {};
  Notifications: {};
  Post_Artwork: { post_id: string };
  Post_Skill: { post_id: string };
  Post_Presentation: { post_id: string };
};

export type PostViewRoute = RouteProp<
  MyStackPrams,
  'Post_Presentation' | 'Post_Artwork' | 'Post_Skill'
>;
