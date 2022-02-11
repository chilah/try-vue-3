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
                    active: articleTab === 'my-article',
                  }"
                  @click="toggleCurrentTab('my-article')"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{
                    active: articleTab === 'favorite-article',
                  }"
                  @click="toggleCurrentTab('favorite-article')"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>

          <template v-if="articleTab === 'my-article'">
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
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  @click="submitFavorite(index, article.slug)"
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

          <template v-if="articleTab === 'favorite-article'">
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
import { getArticles, getProfile, postFavorite } from "@/services";
import { Article, IProfile } from "@/type";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

type ArticleTabType = "my-article" | "favorite-article";

const router = useRoute();
const { userInfo } = useAuth();
const username = computed<string>(() => router.params.username as string);

const profileInfo = ref<IProfile>();
const articles = ref<Article[]>([]);
const articleTab = ref<ArticleTabType>("my-article");

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

const submitFavorite = async (index: number, slug: string) => {
  try {
    const { data } = await postFavorite(slug);

    articles.value[index] = data;
  } catch (error) {
    console.log(error);
  }
};

const toggleCurrentTab = (tabName: ArticleTabType) => {
  articleTab.value = tabName;
};

onMounted(async () => {
  await getCurrentProfile();
  await getCurrentArticles();
});

watch(username, getCurrentProfile);
</script>
