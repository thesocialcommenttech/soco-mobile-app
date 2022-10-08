import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { Black } from '~/src/utils/colors';

export interface EmptyMessageProps {
  message: string;
  center?: boolean;
  style?: StyleProp<TextStyle>;
}

export default function EmptyMessage({
  message,
  style,
  center
}: EmptyMessageProps) {
  return (
    <Text
      style={[{ color: Black[600] }, center && { textAlign: 'center' }, style]}
    >
      {message}
    </Text>
  );
}
