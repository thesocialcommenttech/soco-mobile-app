import React from 'react';
import { Avatar } from '@rneui/base';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { navigatePostScreen, staticFileSrc } from '~/src/utils/methods';
import { SearchedPost } from '~/src/utils/typings/search_interface/searchPost.interface';
import { SearchedUser } from '~/src/utils/typings/search_interface/searchUsername.interface';
import { Black } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { PostType } from '~/src/utils/typings/post';
import { MainStackScreenProps } from '~/src/types/navigation/main';

function UserItem({ user_id, name, username, profilePic }) {
  const navigation = useNavigation<MainStackScreenProps['navigation']>();

  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      onPress={() =>
        navigation.navigate('App', {
          screen: 'ProfileTab',
          params: { screen: 'Profile', params: { user_id, username } }
        })
      }
      style={styles.userItem}
    >
      <>
        <Avatar
          rounded
          size={38}
          source={{
            uri: profilePic
          }}
          containerStyle={styles.avatar}
        />
        <View style={styles.txt}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
}

function PostItem({
  title,
  post_id,
  username,
  postType
}: {
  post_id: string;
  title: string;
  username: string;
  postType: PostType;
}) {
  const navigation = useNavigation<MainStackScreenProps['navigation']>();

  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      onPress={() => {
        navigatePostScreen(navigation, post_id, postType);
      }}
      style={styles.postItem}
    >
      <>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.username}>@{username}</Text>
      </>
    </TouchableHighlight>
  );
}

// the filter
function Results({
  searchEntity,
  data
}: {
  searchEntity: 'users' | 'posts';
  data: (SearchedUser | SearchedPost)[];
}) {
  return (
    <ScrollView style={styles.list__container}>
      <View>
        {searchEntity === 'users'
          ? data.map((user: SearchedUser) => (
              <UserItem
                key={user._id}
                user_id={user._id}
                name={user.name}
                username={user.username}
                profilePic={staticFileSrc(user.profileImage)}
              />
            ))
          : data.map((post: SearchedPost) => (
              <PostItem
                key={post._id}
                title={post.title}
                postType={post.postType}
                post_id={post._id}
                username={post.postedBy.username}
              />
            ))}
      </View>
    </ScrollView>
  );
}

export default Results;

const styles = StyleSheet.create({
  list__container: {
    width: '100%',
    marginTop: 10
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  avatar: {
    marginRight: 15
  },
  txt: {
    justifyContent: 'space-around'
  },
  name: {
    fontSize: 16,
    color: 'black'
    // fontFamily: 'Roboto-Medium'
  },
  username: {
    // fontSize: 16,
    // marginBottom: 5,
    color: Black[600]
    // fontFamily: 'Roboto-Medium'
  },
  postItem: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 16,
    color: 'black'
    // fontFamily: 'Roboto-Medium'
  }
});
