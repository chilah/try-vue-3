import { getArticles, postFavorite, postUnfavorite } from "@/services";
import { ArticleDetail } from "@/type";
import { Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
interface UsableArticle {
  articles: Ref<ArticleDetail[]>;
  articleTab: Ref<ArticleTabType>;
  updateArticle: (index: number, article: ArticleDetail) => void;
  toggleCurrentTab: (tabName: ArticleTabType) => void;
  submitFavorite: (
    index: number,
    slug: string,
    hasFavorited: boolean
  ) => Promise<void>;
}

type ArticleTabType = "my-articles" | "my-favorties";

export const useArticle = (): UsableArticle => {
  const articles = ref<ArticleDetail[]>([]);
  const articleTab = ref<ArticleTabType>("my-articles");

  const route = useRoute();
  const username = ref("");

  const submitFavorite = async (
    index: number,
    slug: string,
    hasFavorited: boolean
  ) => {
    try {
      if (hasFavorited) {
        const { data } = await postUnfavorite(slug);

        updateArticle(index, data.article);
      } else {
        const { data } = await postFavorite(slug);

        updateArticle(index, data.article);
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
  };
};
