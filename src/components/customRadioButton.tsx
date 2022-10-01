import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../utils/colors';

const CustomRadioButton = (props: {
  onSelectionChange: (selection: { index: number; option: string }) => void;
  options: string[];
  errorTxt: string;
  label: string;
  initialSelection?: string;
}) => {
  // const [one, setone] = React.useState(false);
  // const [two, settwo] = React.useState(false);

  const [selectedOption, setSelectedOption] = useState<number>(
    props.options.indexOf(props.initialSelection)
  );

  const selectOption1 = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    props.onSelectionChange({
      index: optionIndex,
      option: props.options[optionIndex]
    });
    // setone(true);
    // settwo(false);
  };

  // const selectOption2 = () => {
  //   props.onPress(props.option2);
  //   // setone(false);
  //   // settwo(true);
  // };

  return (
    <View>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.radioContainer}>
        {props.options.map((option, i) => (
          <TouchableOpacity
            key={i + option}
            style={
              selectedOption !== i
                ? styles.radioButton
                : [
                    {
                      ...styles.radioButton,
                      backgroundColor: Colors.LightPrimary
                    }
                  ]
            }
            onPress={() => selectOption1(i)}
          >
            <Text
              style={
                selectedOption !== i
                  ? styles.optionText
                  : [{ ...styles.optionText, fontWeight: '700' }]
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity
          style={
            one === false
              ? styles.radioButton
              : [
                  {
                    ...styles.radioButton,
                    backgroundColor: Colors.LightPrimary
                  }
                ]
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
              : [
                  {
                    ...styles.radioButton,
                    backgroundColor: Colors.LightPrimary
                  }
                ]
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
        </TouchableOpacity> */}
      </View>
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
    borderColor: Colors.GrayBorder,
    backgroundColor: Colors.White,
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
    borderColor: Colors.Primary1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center'
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
  optionText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 21,
    color: Colors.Black
  }
});

export default CustomRadioButton;
