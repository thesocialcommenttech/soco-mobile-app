import React from 'react';
import { View, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { Blue } from '~/src/utils/colors';

type LoadingProps = { style?: StyleProp<ViewStyle> };

export default function Loading({ style }: LoadingProps) {
  return (
    <View style={[{ justifyContent: 'center', padding: 20 }, style]}>
      <ActivityIndicator color={Blue.primary} size={32} />
    </View>
  );
}
