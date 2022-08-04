import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FollowList from './followList';

const Data = [
  {
    id: 1,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 2,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 3,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 4,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 5,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 6,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 7,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 8,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  },
  {
    id: 9,
    title: 'Varun Chauhan',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    userId: 'Varun19'
  }
];

export default function Following() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FollowList
            title={item.title}
            userId={item.userId}
            image={item.image}
            unfollow={true}
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
