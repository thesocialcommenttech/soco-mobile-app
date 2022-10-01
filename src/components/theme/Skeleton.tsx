import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Black } from '~/src/utils/colors';
import { Skeleton as RNEUISkeleton, SkeletonProps } from '@rneui/themed';

function Skeleton(
  props: Omit<SkeletonProps, 'LinearGradientComponent' | 'animation'>
) {
  return (
    <RNEUISkeleton
      {...props}
      LinearGradientComponent={() => (
        <LinearGradient
          colors={[Black[200], Black[300], Black[200]]}
          useAngle={true}
          locations={[0.0, 0.5, 1.0]}
          angle={90}
        >
          <View style={{ height: '100%', width: '100%' }} />
        </LinearGradient>
      )}
      animation="wave"
      style={[{ backgroundColor: Black[200] }, props.style]}
    />
  );
}

export default Skeleton;
