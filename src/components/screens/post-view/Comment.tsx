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
import { PostComment } from '~/src/utils/typings/post';

export default function Comment({
  comment,
  style
}: {
  comment: PostComment;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.comment, style]}>
      <Image
        source={{ uri: staticFileSrc(comment.by.profileImage) }}
        style={styles.commentAuthorImg}
      />
      <View style={styles.commentBody}>
        <Text style={styles.commentUsername}>{comment.by.username}</Text>
        <Text style={styles.commentText}>{comment.comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentAuthorImg: {
    width: 30,
    height: 30,
    borderRadius: 20
  },
  commentUsername: {
    color: Black[600],
    fontSize: 12
  },
  commentText: {
    color: 'black',
    fontSize: 14
  },
  commentBody: {
    marginLeft: 10
  },
  comment: {
    flexDirection: 'row'
  }
});
