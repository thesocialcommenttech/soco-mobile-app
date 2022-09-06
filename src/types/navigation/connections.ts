import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { ConnectionStackScreenProps } from './profile';

export type IConnectionTabStack = {
  Followings: undefined;
  Followers: undefined;
};

export type ConnectionScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<IConnectionTabStack, 'Followers' | 'Followings'>,
  ConnectionStackScreenProps
>;
