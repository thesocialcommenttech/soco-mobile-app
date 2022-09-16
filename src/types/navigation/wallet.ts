import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WalletTransaction } from '~/src/utils/typings/wallet_interfaces/getWallet.interface';
import { Setting_ScreenProps } from './setting';

export type IWalletStack = {
  Wallet: undefined;
  WalletTransactions: undefined;
  TransactionDetails: {
    transaction: WalletTransaction;
  };
  AddAccount: undefined;
};

export type Wallet_ScreenProps<T extends keyof IWalletStack> =
  CompositeScreenProps<
    NativeStackScreenProps<IWalletStack, T>,
    Setting_ScreenProps<'WalletStack'>
  >;
