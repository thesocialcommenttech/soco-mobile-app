import dayjs from 'dayjs';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import { Black } from '~/src/utils/colors';
import { staticFileSrc } from '~/src/utils/methods';
import { User } from '~/src/utils/typings/user-profile_interface/getUserData.interface';
import Skeleton from '../../theme/Skeleton';
import { omit } from 'lodash';

export default function PostAuthorNTimestamp(props: {
  profileImage: string;
  name: string;
  timestamp: string;
  authorId: User['_id'];
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}) {
  if (props.loading) {
    return (
      <View style={[styles.userview, props.style]}>
        <View style={styles.userphotoandname}>
          <Skeleton style={omit(styles.userimg, 'backgroundColor')} />
          <Skeleton height={14} width={110} />
        </View>
        <Skeleton height={14} width={100} />
      </View>
    );
  }

  return (
    <View style={[styles.userview, props.style]}>
      <View style={styles.userphotoandname}>
        <Image
          style={styles.userimg}
          source={{ uri: staticFileSrc(props.profileImage) }}
        />
        <Text style={styles.usrname}>{props.name}</Text>
      </View>
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
    alignItems: 'center'
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
