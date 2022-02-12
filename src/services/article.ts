import { Article, ArticleDetail, ArticlesResponse } from "@/type";
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
