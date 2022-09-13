export interface PostSharedRequest {
  description: string;
  sharedPostID: string;
  sharedPostType: string;
  postedOn: string;
}

interface Share {
  _id?: string;
}

export interface PostSharedResponse {
  share?: Share;
  success?: boolean;
}
