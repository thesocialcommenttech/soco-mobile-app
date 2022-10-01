import create from 'zustand';
import { GetWalletResponse } from '../utils/typings/wallet_interfaces/getWallet.interface';

type IWalletData = Pick<
  GetWalletResponse,
  'wallet' | 'withdraw_destinations' | 'kyc'
>;

interface WalletScreenState {
  wallet: IWalletData;
  setWallet: (data: IWalletData) => void;
}

export const useWallet = create<WalletScreenState>(set => ({
  wallet: null,
  setWallet: data => set({ wallet: data })
}));
