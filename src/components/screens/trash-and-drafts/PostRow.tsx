import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { Colors } from '~/src/utils/colors';
import { Post } from '~/src/utils/typings/post';

export default function PostRow(props: {
  postId: Post['_id'];
  title: string;
  suffixAction: (props: {
    loading: boolean;
    setLoading: (value: boolean) => void;
  }) => ReactElement;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <View
      style={[loading && { backgroundColor: Colors.Gray100, opacity: 0.5 }]}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{props.title}</Text>
        {loading ? (
          <ActivityIndicator
            color={Colors.Gray200}
            size={20}
            style={styles.activityIndicator}
          />
        ) : (
          props.suffixAction({ setLoading, loading })
        )}
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: Colors.Gray100,
    borderBottomWidth: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.Black,
    fontFamily: 'Roboto',
    width: '90%'
  },
  activityIndicator: { padding: 5 }
});
