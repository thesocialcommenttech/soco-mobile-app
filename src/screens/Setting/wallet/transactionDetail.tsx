import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';

export default function TransactionDetail() {
  const copyToClipboard = text => {
    Clipboard.setString(text);
  };

  const showToast = () => {
    ToastAndroid.show('ID copied to Clipboard', ToastAndroid.SHORT);
  };

  const [id] = useState('1585250968912DB5-42Z1JAL3X3');
  return (
    <View style={styles.container}>
      <Text style={styles.amttext}>Amount</Text>
      <Text style={styles.amount}>₹ 100</Text>
      <Text style={styles.date}>@ 15 May 2020 9:30 am</Text>
      <Text style={styles.closingBalance}>Closing Balance: ₹ 240</Text>
      <Text style={styles.withdrawview}>Withdrawn To</Text>
      <View style={styles.row}>
        <View style={styles.imageview}>
          <Image source={require('../../../assets/images/icons/UPI.png')} />
        </View>
        <Text style={styles.upitrans}>testxxx@sbi</Text>
      </View>
      <View style={styles.withdrawdet}>
        <Text style={styles.amttext}>Transaction ID</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            copyToClipboard(id);
            showToast();
          }}
        >
          <Icon name="content-copy" size={20} color="#BDBDBD" />
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.transtext}>{id}</Text>
      <Text style={styles.status}>Status</Text>
      <Text style={styles.statusprocessed}>Processed</Text>
      <Text style={styles.statuscancelled}>Failed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '4%'
  },
  amttext: {
    fontFamily: 'Roboto-Normal',
    color: '#7D7987',
    fontSize: 16
  },
  amount: {
    color: 'black',
    fontSize: 24,
    marginTop: '6%',
    fontFamily: 'Roboto',
    fontWeight: '600'
  },
  date: {
    marginTop: '6%',
    color: 'black',
    fontSize: 15
  },
  closingBalance: {
    marginTop: '2%',
    color: 'black',
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
    flexDirection: 'row'
  },
  imageview: {
    marginTop: '7.5%'
  },
  upitrans: {
    marginTop: '6.6%',
    marginLeft: '5%',
    color: '#000000',
    fontSize: 15
  },
  transtext: {
    marginTop: '6%',
    fontSize: 15,
    color: 'black'
  },
  status: {
    fontFamily: 'Roboto-Normal',
    color: '#7D7987',
    fontSize: 16,
    marginTop: '9%'
  },
  statusprocessed: {
    color: '#00A300',
    fontSize: 18,
    fontWeight: '500',
    marginTop: '6%'
  },
  statuscancelled: {
    color: '#EE0000',
    fontSize: 18,
    fontWeight: '500',
    marginTop: '6%'
  }
});
