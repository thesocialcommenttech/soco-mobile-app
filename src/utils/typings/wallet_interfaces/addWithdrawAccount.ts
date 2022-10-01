import { User } from '../user-profile_interface/getUserData.interface';

interface Wallet {
  balance?: number;
  wallet_id?: string;
}

export type WithdrawDestinationType = 'upi' | 'bank';

export interface UPIWithdrawDestData {
  upi_id: string;
}

export interface BankWithdrawDestData {
  holder_name: string;
  bank_account_no: string;
  bank_ifsc: string;
}

export type WithdrawDestinationData =
  | UPIWithdrawDestData
  | BankWithdrawDestData;

export interface AddWithdrawAccountResponse {
  success: boolean;
  destination_details: {
    destination_type: WithdrawDestinationType;
    rzp_fund_account_id: string;
    rzp_contact_id: string;
    user_id: User['_id'];
    detail: WithdrawDestinationData;
    timestamp: string;
    _id: string;
  };
}
