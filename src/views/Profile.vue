<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profileInfo?.image" class="user-img" />
            <h4>{{ profileInfo?.username }}</h4>
            <p>
              {{ profileInfo?.bio }}
            </p>

            <button
              v-if="toggleFollowBtn"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profileInfo?.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{
                    active: articleTab === 'my-articles',
                  }"
                  @click="toggleCurrentTab('my-articles')"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{
                    active: articleTab === 'my-favorties',
                  }"
                  @click="toggleCurrentTab('my-favorties')"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>

          <template v-if="articleTab === 'my-articles'">
            <div
              v-for="(article, index) in articles"
              class="article-preview"
              :key="article.body"
            >
              <div class="article-meta">
                <a href=""><img :src="article.author.image" /></a>
                <div class="info">
                  <a href="" class="author">{{ article.author.username }} </a>
                  <span class="date">{{ article.createdAt }} </span>
                </div>
                <button
                  class="btn btn-sm pull-xs-right"
                  :class="[
                    article.favorited ? 'btn-primary' : 'btn-outline-primary',
                  ]"
                  @click="
                    submitFavorite(index, article.slug, article.favorited)
                  "
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.body }}</p>
                <span>Read more...</span>
              </a>
            </div>
          </template>

          <template v-if="articleTab === 'my-favorties'">
            <div
              v-for="article in articles"
              class="article-preview"
              :key="article.body"
            >
              <div class="article-meta">
                <a href=""><img :src="article.author.image" /></a>
                <div class="info">
                  <a href="" class="author">zzzz</a>
                  <span class="date">xxx </span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 1
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>cccc</h1>
                <p>vvvv</p>
                <span>Read more...</span>
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composable";
import {
  getArticles,
  getProfile,
  postFavorite,
  postUnfavorite,
} from "@/services";
import { ArticleDetail, IProfile } from "@/type";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

type ArticleTabType = "my-articles" | "my-favorties";

const router = useRoute();
const { userInfo } = useAuth();
const username = computed<string>(() => router.params.username as string);

const profileInfo = ref<IProfile>();
const articles = ref<ArticleDetail[]>([]);
const articleTab = ref<ArticleTabType>("my-articles");

const getCurrentProfile = async () => {
  try {
    const {
      data: { profile },
    } = await getProfile(username.value);

    profileInfo.value = profile;
  } catch (error) {
    console.log(error);
  }
};

const toggleFollowBtn = computed<boolean>(() => {
  if (userInfo.value?.username === profileInfo.value?.username) {
    return false;
  }

  return true;
});

const getCurrentArticles = async () => {
  try {
    const { data } = await getArticles({ author: profileInfo.value?.username });

    articles.value = data.articles;
  } catch (error) {
    console.log(error);
  }
};

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
    const { data } = await getArticles({ author: profileInfo.value?.username });

    articles.value = data.articles;
  }

  if (articleTab.value === "my-favorties") {
    const { data } = await getArticles({
      favorited: profileInfo.value?.username,
    });

    articles.value = data.articles;
  }
};

watch(articleTab, () => getArticlesType());

onMounted(async () => {
  await getCurrentProfile();
  await getArticlesType();
});

watch(username, getCurrentProfile);
</script>
