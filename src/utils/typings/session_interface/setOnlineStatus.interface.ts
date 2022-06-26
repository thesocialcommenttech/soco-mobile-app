interface Session {
  startTimestamp?: Date;
  userId?: string;
  _id?: string;
  __v?: number;
}

export interface SetOnlineStatusResponse {
  session?: Session;
  success?: boolean;
}
