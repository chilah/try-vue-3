import {
  Article,
  ArticleForm,
  ArticlesResponse,
  CommentResponse,
  CommentsResponse,
} from "@/type";
import { AxiosError, AxiosResponse } from "axios";
import baseInstance from "./request";

const ARTICLE_API_PATH = "/articles";

type AxiosPromise<T> = Promise<AxiosResponse<T>>;

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

interface ArticleParams {
  tag: string;
  author: string;
  favorited: string;
  limit: number;
  offset: number;
}

export const getArticles = async ({
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
  author,
  favorited,
  tag,
}: Partial<ArticleParams>): AxiosPromise<ArticlesResponse> => {
  try {
    const params = {
      ...(author && { author }),
      ...(favorited && { favorited }),
      ...(tag && { tag }),
      limit,
      offset,
    };

    const response = await baseInstance.get<ArticlesResponse>(
      ARTICLE_API_PATH,
      {
        params,
      }
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err.response;
  }
};

export const postFavorite = async (slug: string): AxiosPromise<Article> => {
  try {
    const response = await baseInstance.post<Article>(
      `${ARTICLE_API_PATH}/${slug}/favorite`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const postUnfavorite = async (slug: string): AxiosPromise<Article> => {
  try {
    const response = await baseInstance.delete<Article>(
      `${ARTICLE_API_PATH}/${slug}/favorite`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const getArticleDetail = async (slug: string): AxiosPromise<Article> => {
  try {
    const response = await baseInstance.get<Article>(
      `${ARTICLE_API_PATH}/${slug}`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const getComments = async (
  slug: string
): AxiosPromise<CommentsResponse> => {
  try {
    const response = await baseInstance.get<CommentsResponse>(
      `${ARTICLE_API_PATH}/${slug}/comments`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const postComment = async (
  slug: string,
  comment: string
): AxiosPromise<CommentResponse> => {
  try {
    const response = await baseInstance.post<CommentResponse>(
      `${ARTICLE_API_PATH}/${slug}/comments`,
      {
        comment: {
          body: comment,
        },
      }
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const deleteArticle = async (slug: string) => {
  try {
    const response = await baseInstance.delete(`${ARTICLE_API_PATH}/${slug}`);

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const postArticle = async (
  article: ArticleForm
): AxiosPromise<Article> => {
  try {
    const response = await baseInstance.post<Article>(ARTICLE_API_PATH, {
      article,
    });

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const putArticle = async (
  slug: string,
  article: ArticleForm
): AxiosPromise<Article> => {
  try {
    const response = await baseInstance.put(`${ARTICLE_API_PATH}/${slug}`, {
      article,
    });

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};
