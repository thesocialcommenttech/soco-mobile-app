export interface VerifySubscriptionPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  transaction_id: string;
}

export interface VerifySubscriptionPaymentResponse {
  completed: boolean;
  signature_verified: boolean;
  success: boolean;
}
