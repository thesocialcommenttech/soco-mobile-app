export interface PostArticleRequest {
  postStatus?: string;
}

interface Article {
  _id?: string;
  title?: string;
}

export interface PostArticleResponse {
  article?: Article;
  success?: boolean;
}
