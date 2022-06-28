import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TransactionList from '../../../components/settingsComponents/transactionList';

const Data = [
  {
    id: 1,
    type: 'Withdrawn',
    amount: '100',
    date: '1 Feb,2020'
  },
  {
    id: 2,
    type: 'Credit',
    amount: '100',
    date: '1 Feb,2020'
  },
  {
    id: 3,
    type: 'Withdrawn',
    amount: '100',
    date: '1 Feb,2020'
  }
];

export default function Transaction() {
  return (
    <View style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionList
            type={item.type}
            amount={item.amount}
            date={item.date}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '4%'
  }
});
