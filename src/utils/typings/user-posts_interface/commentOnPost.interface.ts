interface NewComment {
  by: string;
  comment: string;
}

export interface CommentOnPostResponse {
  newComment: NewComment;
  success: boolean;
}
