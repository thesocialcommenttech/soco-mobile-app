import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { ProfileTab_ScreenProps } from './bottomBar';
import { IConnectionTabStack } from './connections';
import { PortfolioTabScreenParam } from './portfolio';

export interface ProfileScreenParams {
  username?: User['username'];
  user_id: User['_id'];
}

export type ProfileTabStack = {
  Profile: ProfileScreenParams;
  Drafts: {};
  Trash: {};
  Connections: NavigatorScreenParams<IConnectionTabStack>;
  PortfolioStack: PortfolioTabScreenParam;
};

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileTabStack, 'Profile'>,
  ProfileTab_ScreenProps
>;

export type ConnectionStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileTabStack, 'Connections'>,
  ProfileTab_ScreenProps
>;
