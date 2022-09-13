import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ToastConfigParams } from 'react-native-toast-message';
import { Black } from '~/src/utils/colors';

export default function Toast(props: ToastConfigParams<any>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Black.primary,
    elevation: 5,
    borderRadius: 8,
    alignSelf: 'stretch'
  },
  text: { color: 'white' }
});
