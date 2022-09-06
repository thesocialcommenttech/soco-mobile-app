import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IMainStack, MainStackScreenProps } from './main';

export type App_ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<IMainStack, 'App'>,
  MainStackScreenProps
>;
