export interface VotePostResponse {
  success?: boolean;
}

export interface VotePostRequest {
  type?: 'up' | 'down';
}
