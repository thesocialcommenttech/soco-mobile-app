import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Post } from '~/src/utils/typings/post';
import { BottomTabStack } from './bottomBar';
import { ISettingStack } from './setting';

export type PostViewScreenParam = {
  post_id: Post['_id'];
};

export type IMainStack = {
  App: NavigatorScreenParams<BottomTabStack>;
  Search: {};
  Notifications: {};
  SettingStack: NavigatorScreenParams<ISettingStack>;
  // upload post
  Upload_Artwork: { postId: Post['_id'] };
  Upload_SkillVideo: { postId: Post['_id'] };
  Upload_Presentation: { postId: Post['_id'] };
  Upload_Link: { postId: Post['_id'] };
  // post view
  Post_Artwork: PostViewScreenParam;
  Post_Skill: PostViewScreenParam;
  Post_Presentation: PostViewScreenParam;
  Post_Blog: PostViewScreenParam;
  Post_Article: PostViewScreenParam;
  Post_Project: PostViewScreenParam;
  Post_Link: PostViewScreenParam;
};

export type MainStackScreenProps = NativeStackScreenProps<IMainStack>;

export type PostViewScreenProps = CompositeScreenProps<
  NativeStackScreenProps<
    IMainStack,
    'Post_Presentation' | 'Post_Artwork' | 'Post_Skill' | 'Post_Link'
  >,
  MainStackScreenProps
>;

export type UploadPostScreenProps = CompositeScreenProps<
  NativeStackScreenProps<
    IMainStack,
    | 'Upload_Link'
    | 'Upload_Artwork'
    | 'Upload_Presentation'
    | 'Upload_SkillVideo'
  >,
  MainStackScreenProps
>;
