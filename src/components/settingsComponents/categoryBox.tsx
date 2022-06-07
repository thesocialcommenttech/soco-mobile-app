import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../utils/colors';

export default function Categorybox({
  selectCategory,
  backgroundstyle,
  textstyle,
  text,
  cancel,
  selectClose
}: {
  selectCategory: any;
  backgroundstyle: any;
  textstyle: any;
  text: string;
  cancel: string;
  selectClose: any;
}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (cancel === 'False') {
          selectCategory(text);
        }
      }}
    >
      <View style={styles.container}>
        <View style={backgroundstyle}>
          <Text style={textstyle}>{text}</Text>
          {cancel === 'True'
            ? [
                <View style={styles.close}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      selectClose('cancel ' + text);
                    }}
                  >
                    <FontAwesomeIcon
                      name="close"
                      size={15}
                      color={Colors.White}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ]
            : []}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '1.5%'
  },
  close: {
    marginTop: '2%',
    marginLeft: '1.5%',
    marginRight: '1%'
  }
});
