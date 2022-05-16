import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CustomRadioButton = ({ ...props }) => {
  const [one, setone] = React.useState(false);
  const [two, settwo] = React.useState(false);

  const selectOption1 = () => {
    console.log('one');
    props.onPress(props.option1);
    setone(true);
    settwo(false);
  };
  const selectOption2 = () => {
    console.log('two');
    props.onPress(props.option2);
    setone(false);
    settwo(true);
  };
  return (
    <View>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={
            one === false
              ? styles.radioButton
              : [{ ...styles.radioButton, backgroundColor: '#FFF4CC' }]
          }
          onPress={selectOption1}
        >
          <Text
            style={
              one === false
                ? styles.optionText
                : [{ ...styles.optionText, fontWeight: '700' }]
            }
          >
            {props.option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            two === false
              ? styles.radioButton
              : [{ ...styles.radioButton, backgroundColor: '#FFF4CC' }]
          }
          onPress={selectOption2}
        >
          <Text
            style={
              two === false
                ? styles.optionText
                : [{ ...styles.optionText, fontWeight: '700' }]
            }
          >
            {props.option2}
          </Text>
        </TouchableOpacity>
      </View>
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
  radioContainer: {
    width: '100%',
    height: 65,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginTop: '-4%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  radioButton: {
    width: '45%',
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFCB36',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
    // width: '50%',
    // borderRadius: 5,
    // borderWidth: 1,
    // padding: '4%',
    // borderColor: '#DCDCDC',
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignContent: 'center',
    // marginTop: '-4%'
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
  optionText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 21,
    color: '#000'
  }
});

export default CustomRadioButton;
