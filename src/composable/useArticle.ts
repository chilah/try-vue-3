import {
  getArticleDetail,
  getArticles,
  postFavorite,
  postUnfavorite,
  getComments,
  postComment,
  deleteArticle,
} from "@/services";
import { Article, ArticleDetail, Comment } from "@/type";
import { Ref, ref, toRef, watch } from "vue";
import { useRoute } from "vue-router";
interface UseArticleReturn {
  articles: Ref<ArticleDetail[]>;
  articleTab: Ref<ArticleTabType>;
  updateArticle: (index: number, article: ArticleDetail) => void;
  toggleCurrentTab: (tabName: ArticleTabType) => void;
  submitFavorite: (
    index: number | null,
    slug: string,
    hasFavorited: boolean
  ) => Promise<void>;
  articleDetail: Ref<ArticleDetail | undefined>;
  getArticleBySlug: (slug: string) => Promise<void>;
  comments: Ref<Comment[]>;
  getCommentsBySlug: (slug: string) => Promise<void>;
  submitComment: (slug: string, comment: string) => Promise<void>;
  submitDeleteArticle: (slug: string) => Promise<void>;
}

type ArticleTabType = "my-articles" | "my-favorties";

export const useArticle = (): UseArticleReturn => {
  const articles = ref<ArticleDetail[]>([]);
  const articleTab = ref<ArticleTabType>("my-articles");
  const articleDetail = ref<ArticleDetail>();

  const comments = ref<Comment[]>([]);

  const route = useRoute();
  const username = ref<string>("");

  const submitFavorite = async (
    index: number | null,
    slug: string,
    hasFavorited: boolean
  ) => {
    try {
      let response: Article;

      if (hasFavorited) {
        const { data } = await postUnfavorite(slug);

        response = data;
      } else {
        const { data } = await postFavorite(slug);

        response = data;
      }

      if (index) {
        updateArticle(index, response.article);
      } else {
        articleDetail.value = response.article;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateArticle = (index: number, article: ArticleDetail) => {
    articles.value[index] = article;
  };

  const toggleCurrentTab = (tabName: ArticleTabType) => {
    articleTab.value = tabName;
  };

  const getArticlesType = async () => {
    articles.value = [];

    if (articleTab.value === "my-articles") {
      const { data } = await getArticles({
        author: username.value,
      });

      articles.value = data.articles;
    }

    if (articleTab.value === "my-favorties") {
      const { data } = await getArticles({
        favorited: username.value,
      });

      articles.value = data.articles;
    }
  };

  const getArticleBySlug = async (slug: string) => {
    try {
      const { data } = await getArticleDetail(slug);

      articleDetail.value = data.article;
    } catch (error) {
      console.log(error);
    }
  };

  const getCommentsBySlug = async (slug: string) => {
    try {
      const { data } = await getComments(slug);

      comments.value = data.comments;
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async (slug: string, comment: string) => {
    try {
      const { data } = await postComment(slug, comment);

      comments.value.unshift(data.comment);
    } catch (error) {
      console.log(error);
    }
  };

  const submitDeleteArticle = async (slug: string) => {
    try {
      await deleteArticle(slug);
    } catch (error) {
      console.log(error);
    }
  };

  watch(articleTab, getArticlesType);

  watch(username, () => {
    toggleCurrentTab("my-articles");
    getArticlesType();
  });

  watch(
    () => route.params.username,
    (newValue) => {
      if (typeof newValue === "string") {
        username.value = newValue;
      }
    },
    {
      immediate: true,
    }
  );

  return {
    articles,
    articleTab,
    updateArticle,
    toggleCurrentTab,
    submitFavorite,
    articleDetail,
    getArticleBySlug,
    comments,
    getCommentsBySlug,
    submitComment,
    submitDeleteArticle,
  };
};
