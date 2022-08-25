import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import SettingScreenHeader from '~/src/components/screens/settings/SettingScreenHeader';
import { Route } from '@react-navigation/native';
import SectionHeader from '~/src/components/screens/settings/SectionHeader';
import Button from '~/src/components/theme/Button';
import { Black, Green, Red } from '~/src/utils/colors';
import WithdrawAccount from '~/src/components/settingsComponents/WithdrawAccount';

export default function TransactionDetail({
  route: {
    params: { transactionType }
  }
}: {
  route: Route<string, { transactionType: 'credit' | 'debit' }>;
}) {
  function copyToClipboard(text) {
    Clipboard.setString(text);
    ToastAndroid.show('ID copied to Clipboard', ToastAndroid.SHORT);
  }

  const [id] = useState('1585250968912DB5-42Z1JAL3X3');
  return (
    <>
      <SettingScreenHeader
        title={transactionType === 'credit' ? 'Credit' : 'Withdrawn'}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <SectionHeader label="Amount" style={styles.amttext} />
          <Text style={styles.amount}>₹ 100</Text>
          <Text style={styles.date}>@ 15 May 2020 9:30 am</Text>
          <Text style={styles.closingBalance}>Closing Balance: ₹ 240</Text>
        </View>

        {/* <Text style={styles.withdrawview}>Withdrawn To</Text> */}
        {transactionType === 'debit' && (
          <View style={styles.section}>
            <SectionHeader label="Withdrawn To" style={styles.amttext} />
            <WithdrawAccount
              title="testxxx@sbi"
              type="upi"
              showMoreOpts={false}
            />
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader label="Transaction ID" style={styles.amttext} />
          <Text
            onLongPress={() => copyToClipboard(id)}
            style={styles.transtext}
          >
            {id}
          </Text>
        </View>

        <View style={styles.section}>
          <SectionHeader label="Status" style={styles.amttext} />
          <Text
            style={[
              styles.status,
              { color: true ? Green.primary : Red.primary }
            ]}
          >
            {true ? 'Processed' : 'Failed'}
          </Text>
          {/* <Text style={styles.statuscancelled}>Failed</Text> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  section: {
    marginBottom: 30
  },
  amttext: {
    marginBottom: 20
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
