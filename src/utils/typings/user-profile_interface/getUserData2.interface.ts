interface User {
  premium?: boolean;
  _id?: string;
}

export interface GetUserData2Response {
  success?: boolean;
  user?: User;
}
