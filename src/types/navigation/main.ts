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
  Setting: NavigatorScreenParams<ISettingStack>;
  // upload post
  Upload_Artwork: {};
  Upload_SkillVideo: {};
  Upload_Presentation: {};
  Upload_Link: {};
  // post view
  Post_Artwork: PostViewScreenParam;
  Post_Skill: PostViewScreenParam;
  Post_Presentation: PostViewScreenParam;
};

export type MainStackScreenProps = NativeStackScreenProps<IMainStack>;

export type PostViewScreenProps = CompositeScreenProps<
  NativeStackScreenProps<
    IMainStack,
    'Post_Presentation' | 'Post_Artwork' | 'Post_Skill'
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
