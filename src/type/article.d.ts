import { UserData } from ".";

export interface Author {
  bio: Pick<UserData, "bio">;
  username: Pick<UserData, "username">;
  image: string;
  following: boolean;
}

export interface Article {
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

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}
