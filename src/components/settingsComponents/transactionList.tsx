import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function TransactionList({ ...props }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Transaction Details' as never, {} as never);
      }}
    >
      <View style={styles.container}>
        <View>
          {props.type === 'Credit'
            ? [<Icon name="call-received" size={35} color="#00A300" />]
            : [<Icon name="arrow-top-right" size={35} color="#EE0000" />]}
        </View>
        <View style={styles.maincontent}>
          <View style={styles.detail}>
            <Text style={styles.blacktext}>{props.type}</Text>
            <Text style={styles.blacktext}>₹ {props.amount}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.datetext}>{props.date}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '4%',
    marginBottom: '2%'
  },
  maincontent: {
    flex: 1,
    marginLeft: '2%'
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    marginTop: '0.5%'
  },
  blacktext: {
    color: 'black',
    fontSize: 14
  },
  datetext: {
    color: '#7D7987'
  }
});
