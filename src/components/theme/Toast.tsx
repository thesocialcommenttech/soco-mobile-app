import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement, ReactNode } from 'react';
import { ToastConfigParams } from 'react-native-toast-message';
import { Black, Blue, Red } from '~/src/utils/colors';
import Button from './Button';

export default function Toast(
  props: ToastConfigParams<{
    actionRight?: { onPress: () => void; text: string };
  }>
) {
  return (
    <View style={[styles.container, props.type === 'error' && styles.error]}>
      <Text
        style={styles.text}
        lineBreakMode="clip"
        textBreakStrategy="highQuality"
      >
        {props.text1}
      </Text>
      {props.props?.actionRight && (
        <Button
          size="xs"
          type="filled"
          btnStyle={{ backgroundColor: Black.primary, alignSelf: 'center' }}
          textStyle={{
            color: Blue[300],
            fontSize: 14,
            textTransform: 'uppercase'
          }}
          onPress={() => {
            props.hide();
            props.props?.actionRight?.onPress();
          }}
          text={props.props?.actionRight?.text}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Black.primary,
    elevation: 5,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
    // flexWrap: 'wrap'
  },
  error: { backgroundColor: Red.primary },
  text: { color: 'white', flexWrap: 'wrap', flexShrink: 1, lineHeight: 20 }
});
