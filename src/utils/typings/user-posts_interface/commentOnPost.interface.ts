import { User } from '../user-profile_interface/getUserData.interface';

interface NewComment {
  by?: User['_id'];
  comment?: string;
}

export interface CommentOnPostResponse {
  newComment?: NewComment;
  success?: boolean;
}
