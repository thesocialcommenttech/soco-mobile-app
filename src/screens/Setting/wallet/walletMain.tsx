import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import TextInputWithLabel from '../../../components/textInputWithLabel';
import { TextInput } from 'react-native-paper';
import BankAccountList from '../../../components/settingsComponents/bankAccountList';
import { useNavigation } from '@react-navigation/native';

const Data = [
  {
    id: 1,
    information: 'upi',
    detail: 'testrate@sbi'
  },
  {
    id: 2,
    information: 'bank',
    detail: '12345678XXX'
  }
];

export default function WalletMain() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.mainBalance}>
        <View style={styles.wallet}>
          <Icon name="wallet-outline" size={32} color="#0063FF" />
          <Text style={styles.wallettextview}>Wallet Balance</Text>
        </View>
        <View style={styles.balance}>
          <Text style={styles.amt}>₹{500}</Text>
        </View>
      </View>
      <View style={styles.viewtran}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Wallet Transactions' as never, {} as never);
          }}
        >
          <Text style={styles.transaction}>View transaction</Text>
        </TouchableWithoutFeedback>
        <View style={styles.kyccheck}>
          <View>
            <Icon1 name="user-check" size={22} color="green" />
          </View>
          <View>
            <Text style={styles.kyc}>KYC</Text>
          </View>
        </View>
      </View>
      <View style={styles.withdrawview}>
        <Text style={styles.withdrawtext}>Withdraw</Text>
        <TextInputWithLabel
          placeholder="Amount"
          label="Amount"
          inputStyle={styles.passTB}
          left={
            <TextInput.Icon
              color="black"
              name={'currency-inr'}
              style={styles.eye}
            />
          }
        />
      </View>
      <View style={styles.handlewithdraw}>
        <Image source={require('../../../assets/images/icons/withdraw.png')} />
        <Text style={styles.withtext}>Withdraw</Text>
      </View>
      <View style={styles.account}>
        <Text style={styles.acctext}>Your Accounts</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Add Account' as never, {} as never);
          }}
        >
          <Icon1 name="plus" size={24} color="gray" />
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        data={Data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <BankAccountList
            information={item.information}
            detail={item.detail}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainBalance: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#0063FF',
    justifyContent: 'space-between',
    padding: '5%',
    marginTop: '4%',
    marginLeft: '4%',
    marginRight: '4%',
    borderRadius: 10
  },
  wallet: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  balance: {
    alignSelf: 'center'
  },
  wallettextview: {
    marginLeft: '10%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0063FF'
  },
  amt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  viewtran: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    marginTop: '1%',
    marginLeft: '3%',
    marginRight: '3%'
  },
  kyccheck: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'space-between'
  },
  kyc: {
    color: 'green',
    fontSize: 16
  },
  transaction: {
    fontSize: 16,
    color: '#0063FF',
    fontWeight: 'bold'
  },
  withdrawview: {
    marginLeft: '4%',
    marginTop: '2%',
    marginRight: '4%'
  },
  withdrawtext: {
    fontSize: 16
  },
  passTB: {
    marginTop: '-6%'
  },
  eye: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  handlewithdraw: {
    padding: '2.5%',
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '5%',
    justifyContent: 'center',
    backgroundColor: '#00A300',
    borderRadius: 10,
    flexDirection: 'row'
  },
  withtext: {
    fontSize: 15,
    color: 'white',
    marginTop: '1.5%',
    marginLeft: '2%',
    fontFamily: 'Roboto-normal'
  },
  account: {
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '3%',
    padding: '2.5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  acctext: {
    fontSize: 17
  }
});
