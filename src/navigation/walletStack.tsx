import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import WalletMain from '../screens/Setting/wallet/walletMain';
import Transaction from '../screens/Setting/wallet/transaction';
import TransactionDetail from '../screens/Setting/wallet/transactionDetail';
import AddWithdrawAccount from '../screens/Setting/wallet/AddWithdrawAccount';
import TopBar from '../components/topBar';
import { IWalletStack, Wallet_ScreenProps } from '../types/navigation/wallet';

const Stack = createNativeStackNavigator<IWalletStack>();

export default function WalletStack() {
  const navigation = useNavigation<Wallet_ScreenProps['navigation']>();

  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{ headerShadowVisible: false }}
    >
      <Stack.Screen
        name="Wallet"
        component={WalletMain}
        options={{ title: 'Wallet' }}
      />
      <Stack.Screen
        name="WalletTransactions"
        component={Transaction}
        options={{ title: 'Transactions' }}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetail}
        options={{ title: 'Transaction' }}
      />
      <Stack.Screen name="AddAccount" component={AddWithdrawAccount} />
    </Stack.Navigator>
  );
}
