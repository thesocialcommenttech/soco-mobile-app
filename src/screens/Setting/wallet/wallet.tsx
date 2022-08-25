//import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import KycScreen from './kyc';
import WalletStack from '../../../navigation/walletStack';

export default function Wallet() {
  const [isKyc] = useState(true);
  return <>{isKyc ? [<WalletStack />] : [<KycScreen />]}</>;
}
