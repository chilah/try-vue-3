<script setup lang="ts">
import { useArticle, useProfile } from "@/composable";
import { computed } from "vue";
import { useRoute } from "vue-router";
import ArticleList from "@/components/ArticleList.vue";

const router = useRoute();
const username = computed<string>(() => router.params.username as string);

const { profileInfo, isCurrentUser, hasFollowed, followUser } = useProfile({
  username,
});
const { articles, articleTab, toggleCurrentTab, submitFavorite } = useArticle();
</script>

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
              v-if="!isCurrentUser"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="followUser"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ hasFollowed ? "Unfollow" : "Follow" }}
              {{ profileInfo?.username }}
            </button>

            <router-link to="/settings">
              <button
                v-if="isCurrentUser"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="ion-plus-round"></i>
                &nbsp; Edit Profile Settings
              </button>
            </router-link>
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

          <ArticleList
            v-for="(article, index) in articles"
            :key="article.body"
            :article="article"
            @favorite="submitFavorite(index, article.slug, article.favorited)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
