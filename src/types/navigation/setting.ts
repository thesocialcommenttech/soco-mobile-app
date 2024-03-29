import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackScreenProps } from './main';
import { IWalletStack } from './wallet';

export type ISettingStack = {
  Setting: undefined;
  Interests: undefined;
  Notification: undefined;
  Referral: undefined;
  Subscription: undefined;
  Profile: undefined;
  Password: undefined;
  WalletStack: NavigatorScreenParams<IWalletStack>;
};

export type Setting_ScreenProps<T extends keyof ISettingStack> =
  CompositeScreenProps<
    NativeStackScreenProps<ISettingStack, T>,
    MainStackScreenProps
  >;
