import {
  RouteProp,
  NavigationProp,
  NavigatorScreenParams,
  CompositeScreenProps
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { Post } from './post';
import { User } from './user-profile_interface/getUserData.interface';

export type MainStack = {
  App: NavigatorScreenParams<BottomTabStack>;
  Search: {};
  Notifications: {};
  Post_Artwork: { post_id: Post['_id'] };
  Post_Skill: { post_id: Post['_id'] };
  Post_Presentation: { post_id: Post['_id'] };
};

export type BottomTabStack = {
  HomeTab: {};
  DiscoverTab: {};
  PortfolioTab: {};
  ProfileTab: NavigatorScreenParams<ProfileTabStack>;
};

export type ProfileTabStack = {
  Profile: { username?: User['username']; user_id: User['_id'] };
  Drafts: {};
  Trash: {};
  Setting: {};
  Artwork: {};
  'Skill Video': {};
  VideoPlayer: {};
  Presentation: {};
  Link: {};
  Connections: NavigatorScreenParams<ConnectionTabStack>;
  // Portfolio: {};
};
// { inititalRoute: keyof ConnectionTabStack }
//
export type MainTabNavigation = NavigationProp<BottomTabStack>;

export type ConnectionTabStack = {
  Followings: undefined;
  Followers: undefined;
};

// connections screen
export type ConnectionStackScreenProps = NativeStackScreenProps<
  ProfileTabStack,
  'Connections'
>;
export type ConnectionScreenProps = NativeStackScreenProps<
  ConnectionTabStack,
  'Followers' | 'Followings'
>;

// profile screen
export type ProfileTabRoute = RouteProp<ProfileTabStack, 'Profile'>;
export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileTabStack, 'Profile'>,
  CompositeScreenProps<
    NativeStackScreenProps<BottomTabStack, 'ProfileTab'>,
    NativeStackScreenProps<MainStack>
  >
>;

export type PostViewRoute = RouteProp<
  MainStack,
  'Post_Presentation' | 'Post_Artwork' | 'Post_Skill'
>;
