import { Post, PostVoteType } from '../post';

export interface VotePostResponse {
  success?: boolean;
}

export interface VotePostRequest {
  postID: Post['_id'];
  voteType: PostVoteType;
}
