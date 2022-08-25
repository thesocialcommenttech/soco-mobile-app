export interface SubscriptionHistory {
  _id: string;
  user: string;
  subscription_plan: string;
  receipt_id: string;
  payment_aggregator: 'razorpay';
  subscription_plan_amount: number;
  amount_paid: number;
  discount: number;
  payment_aggregator_data: Record<string, any>;
  status: 'pending' | 'cancelled' | 'completed' | 'failed';
  timestamp: Date | string;
}

export interface GetUserSubscriptionHistoryResponse {
  success?: boolean;
  subscriptions?: SubscriptionHistory[];
}
