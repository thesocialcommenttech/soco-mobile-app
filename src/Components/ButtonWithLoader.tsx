import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const ButtonWithLoader = ({ text, onPress, btnStyle, submitting }) => {
  // add rgba color opacity
  const backgroundColor = submitting
    ? 'rgba(255, 202, 18, 0.4)'
    : 'rgba(255, 202, 18, 1)';
  return (
    <TouchableOpacity
      style={[btnStyle, { backgroundColor }]}
      onPress={submitting ? null : onPress}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithLoader;

const styles = StyleSheet.create({
  textStyle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    lineHeight: 16.41
  }
});
