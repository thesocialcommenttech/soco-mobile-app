import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function commentTab() {
  return (
    <View style={styles.commentTab}>
      <View style={styles.information}>
        <View style={styles.imageCon}>
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png'
            }}
            style={styles.userimgincomment}
          />
        </View>
        <View style={styles.commenttextview}>
          <Text style={styles.commentname}>Robert Fox</Text>
          <Text style={styles.commenttext}>robert_Fox</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentname: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    color: 'black',
    fontSize: 15
  },
  commenttext: {
    color: '#7D7987',
    fontSize: 16
  },
  commenttextview: {
    marginLeft: '8%'
    //marginTop: '1%'
  },
  commentTab: {
    paddingTop: '3%',
    paddingBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  information: {
    flexDirection: 'row'
  },
  imageCon: {
    marginLeft: '4%'
  },
  userimgincomment: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});
