import { useNavigation } from '@react-navigation/native';
import Color from 'color';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import { useSelector } from 'react-redux';
import { IRootReducer } from '~/src/store/reducers';
import { Black, Blue } from '~/src/utils/colors';
import { navigateEditPostScreen, staticFileSrc } from '~/src/utils/methods';
import { Post } from '~/src/utils/typings/post';
import Button from '../../theme/Button';

export default function AuthorCard(props: {
  style?: StyleProp<ViewStyle>;
  author: Post['postedBy'];
  post: { _id: Post['_id']; type: Post['postType'] };
}) {
  const navigation = useNavigation();
  const authUser = useSelector((root: IRootReducer) => root.auth.user);

  if (!props.author) {
    return null;
  }

  return (
    <View style={[styles.authorCardCt, props.style]}>
      <View style={styles.authorCardHead}>
        <Image
          source={{ uri: staticFileSrc(props.author.profileImage) }}
          style={styles.authorProfileImage}
        />
        <View style={styles.authorNameCt}>
          <Text style={styles.authorName}>{props.author.name}</Text>
          <Text style={styles.authorUsername}>{props.author.username}</Text>
        </View>
      </View>
      {props.author.bio && (
        <Text style={styles.authorBio}>{props.author.bio}</Text>
      )}
      {authUser._id === props.author._id && (
        <Button
          size="sm"
          btnStyle={styles.editBtn}
          text="Edit this post"
          onPress={() =>
            navigateEditPostScreen(navigation, props.post._id, props.post.type)
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  authorProfileImage: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: Black[100]
  },
  authorNameCt: {
    marginLeft: 15
  },
  authorName: {
    fontFamily: 'Roboto-Medium',
    color: 'black',
    fontSize: 14
  },
  authorUsername: {
    color: Color('black').alpha(0.6).rgb().string(),
    fontSize: 14
  },
  authorCardHead: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  authorCardCt: {
    backgroundColor: Blue[50],
    marginTop: 15,
    borderRadius: 8,
    padding: 15
  },
  authorBio: {
    color: Color('black').alpha(0.6).rgb().string(),
    lineHeight: 19,
    fontSize: 14,
    marginTop: 10
  },
  editBtn: {
    marginTop: 10
  }
});
