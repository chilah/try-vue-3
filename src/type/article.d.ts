export interface FollowedBy {
  id: number;
  bio: string;
  username: string;
  image: string;
  password: string;
  demo: boolean;
}

export interface Author {
  bio: string;
  username: string;
  image: string;
  following: boolean;
  followedBy?: FollowedBy[];
}

export interface ArticleDetail {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface Article {
  article: ArticleDetail;
}

export interface ArticlesResponse {
  articles: ArticleDetail[];
  articlesCount: number;
}

export interface Comment {
  id: number;
  createAt: Date;
  updateAt: Date;
  body: string;
  author: Author;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}
