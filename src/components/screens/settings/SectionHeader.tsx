import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Black } from '~/src/utils/colors';

export default function SectionHeader(props: {
  label: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  children?: ReactElement | ReactElement[];
}) {
  return (
    <View style={[styles.refferals, props.style]}>
      <Text style={[styles.boldtext, props.labelStyle]}>{props.label}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  boldtext: {
    fontFamily: 'Roboto-Medium',
    color: Black[500],
    // fontSize: 16
  },
  refferals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
