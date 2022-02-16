import { getArticles, postFavorite, postUnfavorite } from "@/services";
import { ArticleDetail, IProfile } from "@/type";
import { onMounted, Ref, ref, watch } from "vue";

interface UseArticleProps {
  profileInfo: Ref<IProfile | undefined>;
}

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

export const useArticle = ({ profileInfo }: UseArticleProps): UsableArticle => {
  const articles = ref<ArticleDetail[]>([]);
  const articleTab = ref<ArticleTabType>("my-articles");

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
        author: profileInfo.value?.username,
      });

      articles.value = data.articles;
    }

    if (articleTab.value === "my-favorties") {
      const { data } = await getArticles({
        favorited: profileInfo.value?.username,
      });

      articles.value = data.articles;
    }
  };

  watch(articleTab, getArticlesType);
  watch(profileInfo, () => {
    toggleCurrentTab("my-articles");
    getArticlesType();
  });

  return {
    articles,
    articleTab,
    updateArticle,
    toggleCurrentTab,
    submitFavorite,
  };
};
