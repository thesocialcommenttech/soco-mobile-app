interface Result {
  email: string;
  email_verified: boolean;
  verification_email_sent: boolean;
}

export interface UpdateUserEmailRequest {
  email: string;
}

export interface UpdateUserEmailResponse {
  success: boolean;
  result: Result;
}
