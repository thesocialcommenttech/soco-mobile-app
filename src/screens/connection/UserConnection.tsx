import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  StyleProp,
  ViewStyle,
  TouchableHighlight
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import { staticFileSrc } from '~/src/utils/methods';
import { Black } from '~/src/utils/colors';
import { StackActions, useNavigation } from '@react-navigation/native';
import Button from '~/src/components/theme/Button';
import { unfollowUser } from '~/src/utils/services/follow-user_service/unfollowUser.service';
import { followUser } from '~/src/utils/services/follow-user_service/followUser.service';
import { AxiosResponse } from 'axios';
import { FollowUserResponse } from '~/src/utils/typings/follow-user_interface/followUser.interface';
import { ConnectionScreenProps } from '~/src/types/navigation/connections';

export default function UserConnection({
  user,
  isFollowing,
  style,
  showFollowActionBtn = false
}: {
  isFollowing: boolean;
  showFollowActionBtn?: boolean;
  user: Pick<User, 'username' | 'name' | 'profileImage' | '_id'>;
  style?: StyleProp<ViewStyle>;
}) {
  const navigation = useNavigation<ConnectionScreenProps['navigation']>();
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(isFollowing);

  async function toggleFollow() {
    try {
      setLoading(true);
      let result: AxiosResponse<FollowUserResponse>;
      if (following) {
        result = await unfollowUser(user._id);
      } else {
        result = await followUser(user._id);
      }

      if (result.data.success) {
        setFollowing(!following);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!(user.profileImage && user.name && user.username)) {
    return null;
  }

  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      onPress={() => {
        navigation.dispatch(
          StackActions.push('Profile', {
            username: user.username,
            user_id: user._id
          })
        );
      }}
      style={[styles.userItem, style]}
    >
      <>
        <View style={styles.information}>
          <Image
            source={{ uri: staticFileSrc(user.profileImage) }}
            style={styles.userProfileImage}
          />
          <View style={styles.userData}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>
        </View>
        {showFollowActionBtn && (
          <Button
            size="sm"
            processing={loading}
            disabled={loading}
            type={following ? 'text' : 'filled'}
            text={following ? 'Unfollow' : 'Follow'}
            onPress={toggleFollow}
          />
        )}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  userItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userProfileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: Black[500]
  },
  userData: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: 'black'
  },
  username: {
    color: Black[600]
  },
  information: {
    flexDirection: 'row'
  },
  unfollow: {
    color: '#7D7987',
    fontWeight: '600'
  },
  unfollowview: {
    marginTop: '3%',
    marginRight: '1%'
  }
});
