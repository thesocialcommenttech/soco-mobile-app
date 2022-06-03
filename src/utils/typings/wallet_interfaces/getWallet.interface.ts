interface Wallet {
  balance?: number;
  wallet_id?: string;
}

export interface GetWalletResponse {
  withdraw_destinations?: string[];
  _id?: string;
  wallet?: Wallet;
  success?: boolean;
  kyc?: boolean;
}
