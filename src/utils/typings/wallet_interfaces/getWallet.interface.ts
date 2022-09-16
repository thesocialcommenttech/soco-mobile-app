import { User } from '../user-profile_interface/getUserData.interface';
import {
  WithdrawDestinationData,
  WithdrawDestinationType
} from './addWithdrawAccount';

interface Wallet {
  balance?: number;
  wallet_id?: string;
}

export interface WithdrawDestination {
  _id: string;
  destination_type: WithdrawDestinationType;
  rzp_fund_account_id: string;
  default: boolean;
  detail: WithdrawDestinationData;
}

export interface GetWalletResponse {
  withdraw_destinations?: WithdrawDestination[];
  _id?: string;
  wallet?: Wallet;
  success?: boolean;
  kyc?: boolean;
}

export interface WalletTransaction {
  amount: number;
  closing_balance: number;
  message: string;
  status:
    | 'processed'
    | 'processing'
    | 'rejected'
    | 'reversed'
    | 'cancelled'
    | 'queued';
  timestamp: string;
  transaction_id: string;
  transaction_type: 'credit' | 'debit';
  user_id: User['_id'];
  _id: string;
}

export interface GetWalletTransactionsResponse {
  transactions: WalletTransaction[];
  success: boolean;
}

export interface DeleteWithdrawAccountResponse {
  deleted_destination: WithdrawDestination['_id'];
  success: boolean;
}

export interface WithdrawWalletMoneyResponse {
  success: boolean;
  transaction_type: WalletTransaction['transaction_type'];
  transaction_id: WalletTransaction['transaction_id'];
  user_id: WalletTransaction['user_id'];
  amount: WalletTransaction['amount'];
  status: WalletTransaction['status'];
  rzp_utr: string;
  closing_balance: WalletTransaction['closing_balance'];
}

export interface UpdateWithdrawAccountResponse {
  destination: WithdrawDestination['_id'];
  success: boolean;
}
