import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import React from 'react';
import { Colors } from '../utils/colors';

const ButtonWithLoader = ({
  text,
  onPress,
  btnStyle,
  submitting
}: {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  btnStyle?: StyleProp<ViewStyle>;
  submitting?: boolean;
}) => {
  // add rgba color opacity
  const backgroundColor = submitting
    ? 'rgba(255, 202, 18, 0.4)'
    : 'rgba(255, 202, 18, 1)';
  return (
    <TouchableOpacity style={[btnStyle, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithLoader;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.Black,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '700',
    lineHeight: 16.41
  }
});
