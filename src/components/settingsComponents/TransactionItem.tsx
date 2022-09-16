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
import { WalletTransaction } from '~/src/utils/typings/wallet_interfaces/getWallet.interface';
import { Wallet_ScreenProps } from '~/src/types/navigation/wallet';
import dayjs from 'dayjs';

export default function TransactionItem({
  transaction
}: {
  transaction: WalletTransaction;
}) {
  const navigation =
    useNavigation<Wallet_ScreenProps<'WalletTransactions'>['navigation']>();
  return (
    <TouchableHighlight
      underlayColor={Black[100]}
      style={styles.transactionCt}
      onPress={() => {
        navigation.navigate('TransactionDetails', { transaction });
      }}
    >
      <View style={styles.container}>
        <View style={styles.maincontent}>
          {transaction.transaction_type === 'credit' ? (
            <MaterialCommunityIcons
              name="arrow-bottom-left"
              size={24}
              color={Green.primary}
              style={[styles.transTypeIcon, { backgroundColor: Green[100] }]}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={24}
              color={Red.primary}
              style={[styles.transTypeIcon, { backgroundColor: Red[100] }]}
            />
          )}
          <View style={styles.detail}>
            <Text style={styles.transactionType}>
              {transaction.transaction_type === 'debit'
                ? 'Withdrawn'
                : 'Credit'}
            </Text>
            <Text style={styles.datetext}>
              {dayjs(transaction.timestamp).format('DD MMM, YYYY')}
            </Text>
          </View>
        </View>
        <Text style={styles.amount}>₹ {transaction.amount}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  transactionCt: {
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  transTypeIcon: {
    padding: 6,
    borderRadius: 8
  },
  maincontent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detail: { marginLeft: 15 },
  transactionType: {
    color: 'black'
  },
  amount: { color: 'black', fontFamily: 'Roboto-Medium' },
  datetext: {
    color: Black[600],
    fontSize: 13
  }
});
