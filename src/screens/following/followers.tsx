import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FollowList from './followList';

const Data1 = [
  {
    id: 1,
    title: 'thesocialcomment',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'thesocialcomment'
  },
  {
    id: 2,
    title: 'thesocialcomment',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'thesocialcomment'
  },
  {
    id: 3,
    title: 'thesocialcomment',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'thesocialcomment'
  },
  {
    id: 4,
    title: 'thesocialcomment',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'thesocialcomment'
  },
  {
    id: 5,
    title: 'thesocialcomment',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'thesocialcomment'
  },
  {
    id: 6,
    title: 'thesocialcomment',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'thesocialcomment'
  }
];

export default function Followers() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Data1}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FollowList
            title={item.title}
            userId={item.userId}
            image={item.image}
            unfollow={false}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
