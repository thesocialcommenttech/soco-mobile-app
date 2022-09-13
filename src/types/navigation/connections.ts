import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { ConnectionStackScreenProps } from './profile';

export type IConnectionTabStack = {
  Followings: { userId: User['_id'] };
  Followers: { userId: User['_id'] };
};

export type ConnectionScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<IConnectionTabStack, 'Followers' | 'Followings'>,
  ConnectionStackScreenProps
>;
