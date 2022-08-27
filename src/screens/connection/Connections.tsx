import { FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import UserConnection from './UserConnection';
import { getUserFollowers } from '~/src/utils/services/follow-user_service/getUserFollowers.service';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import Loading from '~/src/components/theme/Loading';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { ConnectionScreenProps } from '~/src/utils/typings/stack';
import { getUserFollowings } from '~/src/utils/services/follow-user_service/getUserFollowings.service';

type UserProjection = 'name' | 'username' | 'profileImage' | '_id';
type UserConnections = Pick<User, UserProjection>[];

export default function Connections() {
  const route = useRoute<ConnectionScreenProps['route']>();
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  const [users, setUsers] = useState<UserConnections>();
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const projection = 'name username profileImage';

    setLoading(true);
    if (route.name === 'Followers') {
      const result = await getUserFollowers<UserProjection>({
        proj: projection,
        userID: authUser._id
      });
      if (result.data.success) {
        setUsers(result.data.followers);
      }
    } else {
      const result = await getUserFollowings<UserProjection>({
        proj: projection,
        userID: authUser._id
      });

      if (result.data.success) {
        setUsers(result.data.following);
      }
    }

    setLoading(false);
  }

  useFocusEffect(() => {
    if (!users) {
      fetchData();
    }
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={users}
          contentContainerStyle={styles.userList}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <UserConnection
              user={item}
              isFollowing={route.name === 'Followings'}
              showFollowActionBtn={route.name === 'Followings'}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userList: {
    paddingVertical: 15
  }
});
