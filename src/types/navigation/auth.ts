import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IPostRegisterStack } from './post-register';

export type IAuthStack = {
  Login: undefined;
  ForgotPassword: undefined;
  ResetPasswordLinkSent: undefined;
  ResetPassword: { hash: string };
  RegisterOne: undefined;
  RegisterTwo: undefined;
  PostRegister: NavigatorScreenParams<IPostRegisterStack>;
};

export type IAuthStackScreenProps = NativeStackScreenProps<IAuthStack>;

export type IResetPasswordScreenProps = CompositeScreenProps<
  NativeStackScreenProps<IAuthStack, 'ResetPassword'>,
  IAuthStackScreenProps
>;

export type IAuthStackChildScreenProps<T extends keyof IAuthStack> =
  CompositeScreenProps<
    NativeStackScreenProps<IAuthStack, T>,
    IAuthStackScreenProps
  >;
