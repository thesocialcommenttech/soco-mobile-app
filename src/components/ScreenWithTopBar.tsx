import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import TopBar from './topBar';
import { Colors } from '../utils/colors';

export default function ScreenWithTopBar({
  navigation,
  children
}: {
  navigation: any;
  children: ReactElement;
}) {
  return (
    <View style={styles.outerContainer}>
      <TopBar navigation={navigation} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.White
  }
});
