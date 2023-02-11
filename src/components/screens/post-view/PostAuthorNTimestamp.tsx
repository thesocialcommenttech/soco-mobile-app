import dayjs from 'dayjs';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native';
import { Black } from '~/src/utils/colors';
import { staticFileSrc } from '~/src/utils/methods';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import Skeleton from '../../theme/Skeleton';
import { omit } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { Post } from '~/src/utils/typings/post';

export default function PostAuthorNTimestamp(props: {
  user: Post['postedBy'];
  timestamp: Post['postedOn'];
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}) {
  const navigation = useNavigation();

  if (props.loading) {
    return (
      <View style={[styles.userview, props.style]}>
        <Skeleton style={omit(styles.userimg, 'backgroundColor')} />
        <Skeleton height={14} width={110} />
        <Skeleton height={14} width={100} />
      </View>
    );
  }

  return (
    <View style={[styles.userview, props.style]}>
      <TouchableHighlight
        underlayColor={Black[100]}
        onPress={() =>
          navigation.navigate('ProfileStack', {
            screen: 'Profile',
            params: { username: props.user.username, user_id: props.user._id }
          })
        }
        style={styles.userphotoandname}
      >
        <>
          <Image
            style={styles.userimg}
            source={{ uri: staticFileSrc(props.user.profileImage) }}
          />
          <Text style={styles.usrname}>{props.user.name}</Text>
        </>
      </TouchableHighlight>
      <Text style={styles.postdate}>
        {dayjs(props.timestamp).format('DD, MMM YYYY')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userphotoandname: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRadius: 20
  },
  userimg: {
    width: 30,
    height: 30,
    borderRadius: 35,
    marginRight: 10,
    backgroundColor: Black[300]
  },
  usrname: {
    color: 'black',
    fontSize: 15
  },
  postdate: {
    color: Black[600]
  }
});
