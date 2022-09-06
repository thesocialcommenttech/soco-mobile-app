import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Setting_ScreenProps } from './setting';

export type IWalletStack = {
  Wallet: undefined;
  WalletTransactions: undefined;
  TransactionDetails: undefined;
  AddAccount: undefined;
};

export type Wallet_ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<IWalletStack>,
  Setting_ScreenProps<'WalletStack'>
>;
