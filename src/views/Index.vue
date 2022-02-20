<script setup lang="ts">
import { useArticle } from "@/composable";
import ArticleList from "@/components/ArticleList.vue";
import { onMounted } from "vue";

const {
  articleTab,
  toggleCurrentTab,
  articles,
  submitFavorite,
  fetchTags,
  tags,
} = useArticle();

onMounted(async () => {
  await fetchTags();
});
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" @click="toggleCurrentTab('my-articles')">
                <a
                  :class="{
                    'nav-link': true,
                    active: articleTab === 'my-articles',
                  }"
                  >Your Feed</a
                >
              </li>
              <li class="nav-item" @click="toggleCurrentTab('global-feed')">
                <a
                  :class="{
                    'nav-link': true,
                    active: articleTab === 'global-feed',
                  }"
                  >Global Feed</a
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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                v-for="tag in tags"
                :key="tag"
                href=""
                class="tag-pill tag-default"
                >{{ tag }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
