import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import {
  Route,
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import { Black, Green, Red } from '~/src/utils/colors';
import WithdrawAccount from '~/src/components/settingsComponents/WithdrawAccount';
import { Wallet_ScreenProps } from '~/src/types/navigation/wallet';
import dayjs from 'dayjs';

export default function TransactionDetail() {
  const navigation =
    useNavigation<Wallet_ScreenProps<'TransactionDetails'>['navigation']>();
  const {
    params: { transaction }
  } = useRoute<Wallet_ScreenProps<'TransactionDetails'>['route']>();

  function copyToClipboard(text) {
    Clipboard.setString(text);
    ToastAndroid.show('ID copied to Clipboard', ToastAndroid.SHORT);
  }

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title:
          transaction.transaction_type === 'credit' ? 'Credited' : 'Withdrawn'
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <SectionHeader label="Amount" style={styles.amttext} />
        <Text style={styles.amount}>₹ {transaction.amount}</Text>
        <Text style={styles.date}>
          @ {dayjs(transaction.timestamp).format('D MMM YYYY h:m a')}
        </Text>
        <Text style={styles.closingBalance}>Closing Balance: ₹ 240</Text>
      </View>

      {/* {transaction.transaction_type === 'debit' && (
        <View style={styles.section}>
          <SectionHeader label="Withdrawn To" style={styles.amttext} />
          <WithdrawAccount
            title={"testxxx@sbi"}
            type="upi"
            showMoreOpts={false}
          />
        </View>
      )} */}

      <View style={styles.section}>
        <SectionHeader label="Transaction ID" style={styles.amttext} />
        <Text
          onLongPress={() => copyToClipboard(transaction.transaction_id)}
          style={styles.transtext}
        >
          {transaction.transaction_id}
        </Text>
      </View>

      <View style={styles.section}>
        <SectionHeader label="Status" style={styles.amttext} />
        <Text
          style={[
            styles.status,
            {
              color: (() => {
                switch (transaction.status) {
                  case 'processed':
                    return Green.primary;
                  case 'cancelled':
                    return Red.primary;
                  default:
                    break;
                }
              })()
            }
          ]}
        >
          {transaction.status}
        </Text>
        {/* <Text style={styles.statuscancelled}>Failed</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
    // paddingTop: 0
  },
  section: {
    marginBottom: 30
  },
  amttext: {
    marginBottom: 10
  },
  amount: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
    marginBottom: 20
  },
  date: {
    color: Black[700],
    fontSize: 15
  },
  closingBalance: {
    marginTop: 5,
    color: Black[700],
    fontSize: 15
  },
  withdrawdet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '9%'
  },
  withdrawview: {
    marginTop: '8%',
    color: '#7D7987',
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageview: {},
  upitrans: {
    marginLeft: 15,
    color: 'black',
    fontSize: 16
  },
  transtext: {
    fontSize: 16,
    color: 'black'
  },
  status: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    textTransform: 'uppercase'
  }
});
