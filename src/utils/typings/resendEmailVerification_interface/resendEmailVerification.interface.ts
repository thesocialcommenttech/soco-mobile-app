interface ResponseMetadata{
    RequestId:string;
}

interface SendEmailResult{
    MessageId:string;
    ResponseMetadata:ResponseMetadata
}

export interface ResendEmailVerificationResponse{
    success:boolean;
    sendEmailResult:SendEmailResult;
}