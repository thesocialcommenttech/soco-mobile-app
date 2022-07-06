import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

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
          props.onChangeText;
          setTextLength(value.length);
          checktextLength();
        }}
        secureTextEntry={props.isSecureTextEntry}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : '#99969F'
        }
        underlineColorAndroid={'transparent'}
        outlineColor={props.errorTxt ? '#EE0000' : '#DCDCDC'}
        activeOutlineColor={props.errorTxt ? '#EE0000' : 'blue'}
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
      {/* <TextInput
        label={<Text style={{ ...styles.label }}>{props.label}</Text>}
        style={[styles.input, props.inputStyle]}
        // underlineColor='transparent'
      />
      {props.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: '800',
    lineHeight: 14,
    fontStyle: 'normal',
    color: '#000',
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
    // height: 51,
    color: '#000',
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center'
    // borderWidth: 1,
    // borderColor: '#DCDCDC',
    // borderRadius: 5
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: '#EE0000',
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
