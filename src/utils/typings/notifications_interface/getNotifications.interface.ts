interface NotificationPost {
  _id?: string;
  postType?: string;
  title?: string;
}

interface NotificationUser {
  _id?: string;
  username?: string;
  profileImage?: string;
  name?: string;
}

interface NotificationDataLink {
  relativeTo: 'username'| 'root';
  text: string;
  url: string;
}

interface NotificationData {
  links?: NotificationDataLink[];
  postID?: NotificationPost;
  userID?: NotificationUser;
  message?: string;
}

export interface Notification {
  data?: NotificationData;
  notifiedOn?: string;
  type?:
    | 'add-fav'
    | 'new-post'
    | 'shared-post'
    | 'add-like'
    | 'new-comment'
    | 'admin-msg';
  _id?: string;
}

export interface GetNotificatiosnresponse {
  notifications?: {
    read?: Notification[];
    unread?: Notification[];
  };
  success?: boolean;
}
