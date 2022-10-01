import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  Dimensions
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Black, Yellow } from '~/src/utils/colors';
import { staticFileSrc } from '~/src/utils/methods';
import { ReferredUser as IReferredUser } from '~/src/utils/typings/user-referral-data_interface/getUserReferredUsers.interface';
import Skeleton from '../theme/Skeleton';

const width = Dimensions.get('window').width;

export function ReferredUserSkeleton(props: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}>
      <Skeleton height={45} width={45} circle style={{ marginRight: 20 }} />
      <View>
        <Skeleton height={16} width={width * 0.4} />
        <Skeleton height={14} style={{ marginTop: 5 }} width={width * 0.2} />
      </View>
    </View>
  );
}

export default function ReferredUser({
  user,
  style
}: {
  user: IReferredUser;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <>
      <TouchableHighlight
        underlayColor={Black[100]}
        onPress={() => {
          console.log('Pressed');
        }}
        style={[styles.UserItem, style]}
      >
        <>
          <View style={styles.profileImageCt}>
            <Image
              source={{ uri: staticFileSrc(user.profileImage) }}
              style={styles.profileImage}
            />
            {user.premium && (
              <MaterialCommunityIcons
                name="star-outline"
                color={'black'}
                size={16}
                style={styles.primeUserTag}
              />
            )}
          </View>
          <View style={styles.itemBody}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>@{user.username}</Text>
          </View>
        </>
      </TouchableHighlight>
    </>
  );
}

const styles = StyleSheet.create({
  UserItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25
  },
  itemBody: {
    marginLeft: 20
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: 'black'
  },
  primeUserTag: {
    padding: 4,
    borderRadius: 20,
    position: 'absolute',
    right: -6,
    bottom: -6,
    backgroundColor: Yellow.primary,
    elevation: 3
  },
  profileImageCt: {
    flexDirection: 'row'
  },
  username: {
    fontSize: 14,
    color: Black[600]
  }
});
