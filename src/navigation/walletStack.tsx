import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import WalletMain from '../screens/Setting/wallet/walletMain';
import Transaction from '../screens/Setting/wallet/transaction';
import TransactionDetail from '../screens/Setting/wallet/transactionDetail';
import AddWithdrawAccount from '../screens/Setting/wallet/AddWithdrawAccount';
import TopBar from '../components/topBar';

const Stack = createNativeStackNavigator();

export default function WalletStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{ header: () => <TopBar navigation={navigation} /> }}
    >
      <Stack.Screen name="Wallet" component={WalletMain} />
      <Stack.Screen name="Wallet Transactions" component={Transaction} />
      <Stack.Screen name="Transaction Details" component={TransactionDetail} />
      <Stack.Screen name="Add Account" component={AddWithdrawAccount} />
    </Stack.Navigator>
  );
}
