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
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { Post, SharedPost } from './post';
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
  PortfolioTab: { username: User['username'] };
  ProfileTab: NavigatorScreenParams<ProfileTabStack>;
};

export type MainTabNavigation = NavigationProp<BottomTabStack>;

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

// portfolio
export type IPortfolioStack = {
  Portfolio: PortfolioTabScreenParam;
  Updatebio: undefined;
  Addexperience: undefined;
  Addcertificate: undefined;
  Addskill: undefined;
  Addeducation: undefined;
  AddSocialAccounts: undefined;
  Addblog: { postType: Exclude<Post, SharedPost>['postType'] };
};

type IPortfolioStack_AddBlogScreen = NativeStackScreenProps<
  IPortfolioStack,
  'Addblog'
>;

type PortfolioStackScreenProps = BottomTabScreenProps<
  BottomTabStack,
  'PortfolioTab'
>;
interface PortfolioTabScreenParam {
  username: User['username'];
}

export type PortfolioTabStack = {
  Bio: PortfolioTabScreenParam;
  Experiences: PortfolioTabScreenParam;
  Certifications: PortfolioTabScreenParam;
  Educations: PortfolioTabScreenParam;
  Skills: PortfolioTabScreenParam;
  Works: PortfolioTabScreenParam;
};

export type PortfolioTabStackScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<
    PortfolioTabStack,
    'Bio' | 'Certifications' | 'Educations' | 'Experiences' | 'Skills' | 'Works'
  >,
  CompositeScreenProps<
    NativeStackScreenProps<IPortfolioStack, 'Portfolio'>,
    CompositeScreenProps<
      PortfolioStackScreenProps,
      CompositeScreenProps<
        NativeStackScreenProps<MainStack, 'App'>,
        NativeStackScreenProps<MainStack>
      >
    >
  >
>;

// connections screen
export type ConnectionTabStack = {
  Followings: undefined;
  Followers: undefined;
};

// profile screen
export type ProfileTabRoute = RouteProp<ProfileTabStack, 'Profile'>;

type App_ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStack, 'App'>,
  NativeStackScreenProps<MainStack>
>;

export type ProfileTab_ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabStack, 'ProfileTab'>,
  App_ScreenProps
>;

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileTabStack, 'Profile'>,
  ProfileTab_ScreenProps
>;

export type ConnectionStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileTabStack, 'Connections'>,
  ProfileTab_ScreenProps
>;

export type ConnectionScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<ConnectionTabStack, 'Followers' | 'Followings'>,
  ConnectionStackScreenProps
>;

export type PostViewRoute = RouteProp<
  MainStack,
  'Post_Presentation' | 'Post_Artwork' | 'Post_Skill'
>;
