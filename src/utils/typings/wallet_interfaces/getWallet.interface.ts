import { User } from '../user-profile_interface/getUserData.interface';
import {
  WithdrawDestinationData,
  WithdrawDestinationType
} from './addWithdrawAccount';

interface Wallet {
  balance?: number;
  wallet_id?: string;
}

interface WithdrawDestination {
  _id: string;
  destination_type: WithdrawDestinationType;
  rzp_fund_account_id: string;
  wallet_id: string;
  default: boolean;
  user_id: User['_id'];
  rzp_contact_id: User['wallet']['rzp_contact_id'];
  detail: WithdrawDestinationData;
  timestamp: number;
}

export interface GetWalletResponse {
  withdraw_destinations?: WithdrawDestination[];
  _id?: string;
  wallet?: Wallet;
  success?: boolean;
  kyc?: boolean;
}
