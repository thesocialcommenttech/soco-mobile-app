import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Colors } from '../utils/colors';

const TextInputWithLabel = ({ ...props }) => {
  const [textLength, setTextLength] = useState(0);
  const checktextLength = () => {
    if (textLength > props.maxLength) {
      setTextLength(props.maxLength);
    }
  };
  return (
    <View>
      <View style={styles.mainLabelBox}>
        <View style={styles.labelBox}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
        {props.label === 'Description'
          ? [
              <View style={styles.countbox}>
                <Text style={styles.countText}>
                  {textLength}/{props.maxLength}
                </Text>
              </View>
            ]
          : []}
      </View>
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholder={props.placeholder}
        mode="outlined"
        onChangeText={value => {
          props.onChangeText(value);
          setTextLength(value.length);
          checktextLength();
        }}
        secureTextEntry={props.isSecureTextEntry}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : '#99969F'
        }
        underlineColorAndroid={'transparent'}
        outlineColor={props.errorTxt ? Colors.Red : Colors.GrayBorder}
        activeOutlineColor={props.errorTxt ? Colors.Red : 'blue'}
        selectionColor={'black'}
        right={props.right}
        left={props.left}
        onBlur={props.onBlur}
        value={props.value}
        editable={props.editable}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        maxLength={props.maxLength}
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
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    zIndex: 999,
    marginTop: '6%',
    paddingLeft: 4,
    paddingRight: 4
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
  },
  mainLabelBox: {
    flexDirection: 'row',
    zIndex: 999
  },
  countbox: {
    alignSelf: 'flex-start',
    marginLeft: '30%',
    zIndex: 999,
    marginTop: '6%',
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: 'white'
  },
  countText: {
    color: '#7D7987'
  }
});

export default TextInputWithLabel;
