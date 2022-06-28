import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/FontAwesome5';

export default function Experiencelist({ ...props }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableWithoutFeedback onPress={() => props.toggleModal()}>
          <Icon1 name="ellipsis-v" size={15} color="#BDBDBD" />
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.detail}>{props.detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    color: 'black',
    marginTop: '1.5%'
  },
  detail: {
    color: '#7D7987',
    lineHeight: 20,
    marginTop: '2%'
  },
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15.5,
    lineHeight: 17
  }
});
