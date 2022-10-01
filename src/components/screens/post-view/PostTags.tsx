import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Black } from '~/src/utils/colors';
import Skeleton from '../../theme/Skeleton';

export default function PostTags(props: {
  tags: string[];
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}) {
  return (
    <View style={[styles.tagsCt, props.style]}>
      {props.loading ? (
        <>
          <Skeleton width={50} height={34} style={styles.tagBoundary} />
          <Skeleton width={80} height={34} style={styles.tagBoundary} />
          <Skeleton width={70} height={34} style={styles.tagBoundary} />
          <Skeleton width={40} height={34} style={styles.tagBoundary} />
        </>
      ) : (
        props.tags.map((tag, i) => {
          return (
            <Text key={tag + i} style={[styles.tag, styles.tagBoundary]}>
              {tag}
            </Text>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tagsCt: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: Black[200],
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  tagBoundary: {
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5
  }
});
