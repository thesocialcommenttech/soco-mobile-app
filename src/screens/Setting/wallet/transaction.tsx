import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TransactionItem from '../../../components/settingsComponents/TransactionItem';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';

const Data = [
  {
    id: 1,
    type: 'debit',
    amount: '100',
    date: '1 Feb,2020'
  },
  {
    id: 2,
    type: 'credit',
    amount: '100',
    date: '1 Feb,2020'
  },
  {
    id: 3,
    type: 'debit',
    amount: '100',
    date: '1 Feb,2020'
  }
];

export default function Transaction() {
  return (
    <>
      <SettingScreenHeader title="Wallet Transactions" />
      <View style={styles.container}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id.toString()}
          style={{ marginHorizontal: -20 }}
          renderItem={({ item }) => (
            <TransactionItem
              type={item.type}
              amount={item.amount}
              date={item.date}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  }
});
