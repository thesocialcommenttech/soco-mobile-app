import { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useStore } from 'zustand';
import { ProfileContext } from '~/src/state/profileScreenState';
import { Black } from '~/src/utils/colors';
import { followUser } from '~/src/utils/services/follow-user_service/followUser.service';
import { unfollowUser } from '~/src/utils/services/follow-user_service/unfollowUser.service';
import { FollowUserResponse } from '~/src/utils/typings/follow-user_interface/followUser.interface';
import Button from '../../theme/Button';
import * as Sentry from '@sentry/react-native';
import { addAxiosErrorDataBreadcrumb } from '~/src/utils/monitoring/sentry';

export function FollowToggleBtn() {
  const store = useContext(ProfileContext);
  const { setUserProfile, userProfile } = useStore(store);
  const [loading, setLoading] = useState(false);

  async function toggleFollow() {
    try {
      setLoading(true);
      let result: AxiosResponse<FollowUserResponse>;
      if (userProfile.isFollowing) {
        result = await unfollowUser(userProfile._id);
      } else {
        result = await followUser(userProfile._id);
      }

      if (result.data.success) {
        setUserProfile({
          ...userProfile,
          isFollowing: !userProfile.isFollowing
        });
      }
    } catch (error) {
      addAxiosErrorDataBreadcrumb(error);
      Sentry.captureException(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button
      text={userProfile.isFollowing ? 'Following' : 'Follow'}
      fullWidth
      type="outlined"
      onPress={toggleFollow}
      disabled={loading}
      processing={loading}
      btnStyle={[
        styles.followBtn,
        userProfile.isFollowing && styles.unFollowBtn,
        { width: Dimensions.get('window').width / 2 - 30 }
      ]}
      textStyle={[
        styles.followBtnText,
        userProfile.isFollowing && styles.unFollowBtnText
      ]}
    />
  );
}

const styles = StyleSheet.create({
  followBtn: {
    flexGrow: 1,
    flexShrink: 0
  },
  followBtnText: {
    textTransform: 'capitalize'
  },
  unFollowBtn: { borderColor: Black[600] },
  unFollowBtnText: { color: Black[600] }
});
