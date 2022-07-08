interface SendEmailRequest {
  MessageId?: string;
  ResponseMetadata?: {
    RequestId?: string;
  };
}

export interface ResendEmailVerificationResponse {
  sendEmailResult?: SendEmailRequest;
  success?: boolean;
}
