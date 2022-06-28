import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import WalletMain from '../screens/Setting/wallet/walletMain';
import Transaction from '../screens/Setting/wallet/transaction';
import TransactionDetail from '../screens/Setting/wallet/transactionDetail';
import AddAccount from '../screens/Setting/wallet/addAccount';

const Stack = createNativeStackNavigator();

export default function WalletStack() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name="Wallet" component={WalletMain} />
      <Stack.Screen name="Wallet Transactions" component={Transaction} />
      <Stack.Screen name="Transaction Details" component={TransactionDetail} />
      <Stack.Screen name="Add Account" component={AddAccount} />
    </Stack.Navigator>
  );
}
