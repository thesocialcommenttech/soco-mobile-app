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
import { Black, Blue } from '~/src/utils/colors';
import { staticFileSrc } from '~/src/utils/methods';
import { Post } from '~/src/utils/typings/post';
import Button from '../../theme/Button';

export default function AuthorCard(props: {
  style?: StyleProp<ViewStyle>;
  author: Post['postedBy'];
}) {
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
      <Button
        size="sm"
        btnStyle={styles.editBtn}
        text="Edit this post"
        onPress={() => {}}
      />
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
