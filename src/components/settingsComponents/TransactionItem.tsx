import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Black, Green, Red } from '~/src/utils/colors';

export default function TransactionItem(props) {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      style={styles.transactionCt}
      onPress={() => {
        navigation.navigate(
          'Transaction Details' as never,
          { transactionType: props.type } as never
        );
      }}
    >
      <View style={styles.container}>
        <View style={styles.maincontent}>
          {props.type === 'credit' ? (
            <MaterialCommunityIcons
              name="arrow-bottom-left"
              size={24}
              color={Green.primary}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={24}
              color={Red.primary}
            />
          )}
          <View style={styles.detail}>
            <Text style={styles.transactionType}>
              {props.type === 'debit' ? 'Withdrawn' : 'Credit'}
            </Text>
            <Text style={styles.datetext}>{props.date}</Text>
          </View>
        </View>
        <Text style={styles.amount}>₹ {props.amount}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  transactionCt: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  maincontent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detail: { marginLeft: 10 },
  date: {
    marginTop: 5
  },
  transactionType: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto-Medium'
  },
  amount: { color: 'black', fontSize: 16 },
  datetext: {
    color: Black[600]
  }
});
