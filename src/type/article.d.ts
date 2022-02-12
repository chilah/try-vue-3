import { UserData } from ".";

export interface Author {
  bio: Pick<UserData, "bio">;
  username: Pick<UserData, "username">;
  image: string;
  following: boolean;
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
