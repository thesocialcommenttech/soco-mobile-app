import React from 'react';
import { StyleProp, StyleSheet, TextStyle, Text } from 'react-native';
import Skeleton from '../../theme/Skeleton';

export default function PostTitle(props: {
  title: string;
  style?: StyleProp<TextStyle>;
  loading?: boolean;
}) {
  if (props.loading) {
    return <Skeleton height={30} style={props.style} />;
  }

  return <Text style={[styles.postTitle, props.style]}>{props.title}</Text>;
}

const styles = StyleSheet.create({
  postTitle: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Roboto-Medium'
  }
});
