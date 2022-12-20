import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type IPostRegisterStack = {
  Categories: undefined;
  ProfilePicture: undefined;
  CoverPicture: undefined;
  BioScreen: undefined;
};

export type IPostRegisterStackScreenProps =
  NativeStackScreenProps<IPostRegisterStack>;

export type IPostRegisterPageScreenProps<T extends keyof IPostRegisterStack> =
  CompositeScreenProps<
    NativeStackScreenProps<IPostRegisterStack, T>,
    IPostRegisterStackScreenProps
  >;
