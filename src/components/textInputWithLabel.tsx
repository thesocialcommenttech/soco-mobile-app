import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';

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
        outlineColor={props.errorTxt ? '#EE0000' : '#DCDCDC'}
        activeOutlineColor={props.errorTxt ? '#EE0000' : 'blue'}
        selectionColor={'black'}
        right={props.right}
        onBlur={props.onBlur}
        value={props.value}
        editable={props.editable}
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
    // flexDirection: 'row'
    alignSelf: 'flex-start',
    marginLeft: '7%',
    zIndex: 999,
    marginTop: '8%'
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
  }
});

export default TextInputWithLabel;
