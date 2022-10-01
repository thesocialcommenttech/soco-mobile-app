import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { DiscoverTab_ScreenProps } from './bottomBar';
import { ProfileTabStack } from './profile';

export type DiscoverStack = {
  Discover: undefined;
  ProfileStack: ProfileTabStack;
};

export type Discover_ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<DiscoverStack, 'Discover'>,
  DiscoverTab_ScreenProps
>;

export type DiscoverProfileStack_ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<DiscoverStack, 'ProfileStack'>,
  DiscoverTab_ScreenProps
>;
