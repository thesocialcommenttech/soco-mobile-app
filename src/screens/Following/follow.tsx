import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useState } from 'react';
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

export default function Follow() {
  const [flag, setFlag] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.selectab}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!flag) {
              setFlag(true);
            }
          }}
        >
          <View style={styles.following}>
            {flag
              ? [<Text style={styles.active}>Following</Text>]
              : [<Text style={styles.inactive}>Following</Text>]}
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            if (flag) {
              setFlag(false);
            }
          }}
        >
          <View>
            {!flag
              ? [<Text style={styles.active}>Followers</Text>]
              : [<Text style={styles.inactive}>Followers</Text>]}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View />
      {flag
        ? [
            <FlatList
              data={Data}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <FollowList
                  title={item.title}
                  userId={item.userId}
                  image={item.image}
                />
              )}
            />
          ]
        : [
            <FlatList
              data={Data1}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <FollowList
                  title={item.title}
                  userId={item.userId}
                  image={item.image}
                />
              )}
            />
          ]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  selectab: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '7%',
    marginLeft: '7%',

    padding: '3%'
  },
  active: {
    color: '#0063ff'
  },
  inactive: {},
  following: {
    marginRight: '4%'
  }
});
