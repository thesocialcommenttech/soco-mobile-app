import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement, ReactNode } from 'react';
import { ToastConfigParams } from 'react-native-toast-message';
import { Black, Blue, Green, Red } from '~/src/utils/colors';
import Button from './Button';

export default function Toast(
  props: ToastConfigParams<{
    actionRight?: { onPress: () => void; text: string };
  }>
) {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'error':
        return styles.error;
      case 'success':
        return styles.success;
    }
  };

  return (
    <View style={[styles.container, getTypeStyle(props.type)]}>
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
  error: { backgroundColor: Red[700] },
  success: { backgroundColor: Green[600] },
  text: { color: 'white', flexWrap: 'wrap', flexShrink: 1, lineHeight: 20 }
});
