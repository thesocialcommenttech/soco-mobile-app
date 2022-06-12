import { Avatar } from '@rneui/base';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import { Colors } from '../../utils/colors';

// definition of the Item, which will be rendered in the FlatList
const UserItem = ({ name, username, profilePic }) => {
  console.log('profilePic', profilePic);
  return (
    <View style={styles.userItem}>
      <Avatar
        rounded
        source={{
          uri: profilePic
        }}
        containerStyle={styles.avatar}
      />
      <View style={styles.txt}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
};

const PostItem = ({ title, username }) => (
  <View style={styles.postItem}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.username}>{username}</Text>
  </View>
);

const RenderUserItem = ({ item, searchPhrase }) => {
  // when no input, show all
  if (searchPhrase === '') {
    return (
      <UserItem
        name={item.name}
        username={item.username}
        profilePic={item.profilePic}
      />
    );
  }
  // filter of the name
  if (
    item.name
      .toUpperCase()
      .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
  ) {
    return (
      <UserItem
        name={item.name}
        username={item.username}
        profilePic={item.profilePic}
      />
    );
  }
  // filter of the description
  if (
    item.username
      .toUpperCase()
      .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
  ) {
    return (
      <UserItem
        name={item.name}
        username={item.username}
        profilePic={item.profilePic}
      />
    );
  }
  return null;
};

const RenderPostItem = ({ item, searchPhrase }) => {
  // when no input, show all
  if (searchPhrase === '') {
    return <PostItem title={item.title} username={item.username} />;
  }
  // filter of the name
  if (
    item.title
      .toUpperCase()
      .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
  ) {
    return <PostItem title={item.title} username={item.username} />;
  }
  // filter of the description
  if (
    item.username
      .toUpperCase()
      .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
  ) {
    return <PostItem title={item.title} username={item.username} />;
  }
  return null;
};
// the filter
const List = ({ label, searchPhrase, setClicked, data }) => {
  console.log('searchPhrase', searchPhrase);
  console.log('label', label === 'User');
  //   console.log('data', data);

  return (
    <ScrollView style={styles.list__container}>
      <View>
        {label === 'User'
          ? data.map(item => (
              <RenderUserItem
                key={item.id}
                item={item}
                searchPhrase={searchPhrase}
              />
            ))
          : data.map(item => (
              <RenderPostItem
                key={item.id}
                item={item}
                searchPhrase={searchPhrase}
              />
            ))}
      </View>
    </ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    width: '100%',
    marginTop: '5%'
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: '2%'
  },
  avatar: {
    marginRight: '5%'
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
    fontSize: 15,
    marginBottom: 5,
    color: Colors.Gray600,
    fontFamily: 'Roboto-Medium'
  },
  postItem: {
    paddingVertical: '2%'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Roboto-Medium'
  }
});
