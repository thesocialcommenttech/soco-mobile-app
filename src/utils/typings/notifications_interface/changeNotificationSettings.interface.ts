export interface ChangeNotificationSettingsRequest{
    newsletter?:boolean;
}

interface Notification {
  newsletter?: true;
}

interface Result{
    notification?:Notification
}

export interface ChangeNotificationSettingsResponse {
    result?:Result;
    success?:boolean;
}
