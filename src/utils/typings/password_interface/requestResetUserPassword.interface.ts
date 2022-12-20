export interface RequestResetUserPasswordResponse {
  success: boolean;
  sendEmailResult: {
    ResponseMetadata: {
      RequestId: string;
    };
    MessageId: string;
  };
}
