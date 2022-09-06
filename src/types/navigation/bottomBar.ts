import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { App_ScreenProps } from './app';
import { PortfolioTabScreenParam } from './portfolio';
import { ProfileTabStack } from './profile';

export type BottomTabStack = {
  HomeTab: {};
  DiscoverTab: {};
  PortfolioTab: PortfolioTabScreenParam;
  ProfileTab: NavigatorScreenParams<ProfileTabStack>;
};

export type BottomTabChild<T extends keyof BottomTabStack> =
  BottomTabScreenProps<BottomTabStack, T>;

export type HomeStack_ScreenProps = BottomTabChild<'HomeTab'>;

export type DiscoverTab_ScreenProps = CompositeScreenProps<
  BottomTabChild<'DiscoverTab'>,
  App_ScreenProps
>;

export type PortfolioTab_ScreenProps = CompositeScreenProps<
  BottomTabChild<'PortfolioTab'>,
  App_ScreenProps
>;

export type ProfileTab_ScreenProps = CompositeScreenProps<
  BottomTabChild<'ProfileTab'>,
  App_ScreenProps
>;
