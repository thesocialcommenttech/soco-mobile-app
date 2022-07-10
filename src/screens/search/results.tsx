import React, { useEffect } from 'react';
import { Avatar } from '@rneui/base';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { staticFileSrc } from '~/src/utils/methods';
import { SearchedPost } from '~/src/utils/typings/search_interface/searchPost.interface';
import { SearchedUser } from '~/src/utils/typings/search_interface/searchUsername.interface';
import { Colors } from '../../utils/colors';

// definition of the Item, which will be rendered in the FlatList
const UserItem = ({ name, username, profilePic }) => {
  return (
    <View style={styles.userItem}>
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
    </View>
  );
};

const PostItem = ({ title, username }) => (
  <View style={styles.postItem}>
    <Text numberOfLines={2} style={styles.title}>
      {title}
    </Text>
    <Text style={styles.username}>@{username}</Text>
  </View>
);

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
                name={user.name}
                username={user.username}
                profilePic={staticFileSrc(user.profileImage)}
              />
            ))
          : data.map((post: SearchedPost) => (
              <PostItem
                key={post._id}
                title={post.title}
                username={[post.postedBy.username]}
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
    paddingVertical: 10
  },
  avatar: {
    marginRight: 15
  },
  txt: {
    justifyContent: 'space-around'
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Roboto-Medium'
  },
  username: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium'
  },
  postItem: {
    paddingVertical: 8
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Roboto-Medium'
  }
});
