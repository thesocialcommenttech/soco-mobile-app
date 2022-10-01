import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../utils/colors';

const ButtonWithoutLoader = ({ text, onPress, btnStyle, submitting }) => {
  // add rgba color opacity
  return (
    <TouchableOpacity style={[btnStyle]} onPress={submitting ? null : onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithoutLoader;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.White,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    lineHeight: 16.41
  }
});
