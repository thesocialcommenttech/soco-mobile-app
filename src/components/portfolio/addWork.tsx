import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

export default function AddWork({ ...props }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.addblogview}>
      <View style={styles.blogimageandtextview}>
        <Image
          style={styles.addblogimage}
          source={{
            uri: props.uri
          }}
        />
        <Text style={styles.addblogtext} numberOfLines={2}>
          {props.text}
        </Text>
      </View>
      <View>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
          tintColor={'#000000'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addblogview: {
    flexDirection: 'row',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '3%',
    justifyContent: 'space-between'
  },
  addblogimage: {
    height: 80,
    width: 120,
    borderRadius: 7
  },
  addblogtext: {
    color: 'black',
    flexShrink: 1,
    width: 150,
    marginBottom: 5,
    marginLeft: '3%',
    lineHeight: 19,
    fontSize: 15
  },
  blogimageandtextview: {
    flexDirection: 'row'
  }
});
