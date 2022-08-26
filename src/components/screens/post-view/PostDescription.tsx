import React, { ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import Skeleton from '../../theme/Skeleton';

export default function PostDescription(props: {
  description: string;
  loading?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  if (props.loading) {
    return <Skeleton height={100} style={[{ width: '100%' }, props.style]} />;
  }

  if (!props.description) {
    return null;
  }

  return (
    <Text style={[styles.description, props.style]}>{props.description}</Text>
  );
}

const styles = StyleSheet.create({
  description: {
    color: 'black',
    marginTop: 15,
    fontSize: 14,
    lineHeight: 20
  }
});
