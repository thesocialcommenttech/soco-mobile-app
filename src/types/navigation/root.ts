import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IAuthStack } from './auth';
import { IMainStack } from './main';

export type IRootStack = {
  auth: NavigatorScreenParams<IAuthStack>;
  main: NavigatorScreenParams<IMainStack>;
};

export type IRoot_ScreenProps = NativeStackScreenProps<IRootStack>;
