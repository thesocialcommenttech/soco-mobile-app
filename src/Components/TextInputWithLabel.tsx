import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';

const TextInputWithLabel = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        onChangeText={props.onChangeText}
        secureTextEntry={props.isSecureTextEntry}
        label={<Text style={{ ...styles.label }}>{props.label}</Text>}
        placeholder={props.label}
        style={[styles.input, props.inputStyle]}
        placeholderTextColor="#99969F"
        // underlineColor='transparent'
        underlineColorAndroid={'transparent'}
        outlineColor={props.errorTxt ? '#EE0000' : '#DCDCDC'}
        activeOutlineColor={props.errorTxt ? '#EE0000' : '#000'}
        right={props.right}
        value={props.value}
        {...props}
      />
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  label: {
    fontSize: 15,
    fontFamily: 'Roboto-Bold',
    fontWeight: '900',
    lineHeight: 14,
    fontStyle: 'normal'
  },
  input: {
    width: '100%',
    height: 51,
    color: '#000',
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#fff'
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: '#EE0000',
    marginTop: '2%'
  }
});

export default TextInputWithLabel;
