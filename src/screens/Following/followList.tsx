import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import React from 'react';

export default function followList({
  title,
  userId,
  image,
  unfollow
}: {
  title: string;
  userId: string;
  image: string;
  unfollow: boolean;
}) {
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Pressed');
        }}
      >
        <View style={styles.mTab}>
          <View style={styles.information}>
            <View style={styles.imageCon}>
              <Image source={{ uri: image }} style={styles.img} />
            </View>
            <View style={styles.followtext}>
              <Text style={styles.name}>{title}</Text>
              <Text style={styles.userid}>@ {userId}</Text>
            </View>
          </View>
          {unfollow
            ? [
                <TouchableWithoutFeedback>
                  <View style={styles.unfollowview}>
                    <Text style={styles.unfollow}>UNFOLLOW</Text>
                  </View>
                </TouchableWithoutFeedback>
              ]
            : []}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  mTab: {
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageCon: {
    marginLeft: '4%'
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  followtext: {
    marginLeft: '4%',
    marginTop: '1%'
  },
  name: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    color: 'black',
    fontSize: 16
  },
  userid: {
    color: '#7D7987',
    fontSize: 15.5
  },
  information: {
    flexDirection: 'row'
  },
  unfollow: {
    color: '#7D7987',
    fontWeight: '600'
  },
  unfollowview: {
    marginTop: '3%',
    marginRight: '1%'
  }
});
