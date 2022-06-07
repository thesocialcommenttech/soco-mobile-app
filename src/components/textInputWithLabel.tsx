import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { Colors } from '../utils/colors';

const TextInputWithLabel = ({ ...props }) => {
  return (
    <View>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholder={props.placeholder}
        mode="outlined"
        onChangeText={props.onChangeText}
        secureTextEntry={props.isSecureTextEntry}
        placeholderTextColor="grey"
        underlineColorAndroid={'transparent'}
        outlineColor={props.errorTxt ? Colors.Red : Colors.GrayBorder}
        activeOutlineColor={props.errorTxt ? Colors.Red : 'blue'}
        selectionColor={'black'}
        right={props.right}
        onBlur={props.onBlur}
        value={props.value}
        editable={props.editable}
      />
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '800',
    lineHeight: 14,
    fontStyle: 'normal',
    color: Colors.Black,
    padding: '2%',
    marginBottom: '-1%',
    textTransform: 'uppercase'
  },
  labelBox: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginLeft: '7%',
    zIndex: 999,
    marginTop: '8%'
  },
  input: {
    width: '100%',
    color: Colors.Black,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Medium',
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignContent: 'center'
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: Colors.Red,
    marginTop: '2%'
  }
});

export default TextInputWithLabel;
