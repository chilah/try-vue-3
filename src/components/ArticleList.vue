<script setup lang="ts">
import { ArticleDetail } from "@/type";

interface Props {
  article: ArticleDetail;
}

interface Emits {
  (e: "favorite"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="`/profile/${props.article.author.username}`">
        <a href=""><img :src="props.article.author.image" /></a>
      </router-link>
      <div class="info">
        <router-link :to="`/profile/${props.article.author.username}`">
          <a href="" class="author">{{ props.article.author.username }} </a>
        </router-link>
        <span class="date">{{ props.article.createdAt }} </span>
      </div>
      <button
        class="btn btn-sm pull-xs-right"
        :class="[
          props.article.favorited ? 'btn-primary' : 'btn-outline-primary',
        ]"
        @click="emits('favorite')"
      >
        <i class="ion-heart"></i> {{ props.article.favoritesCount }}
      </button>
    </div>
    <a href="" class="preview-link">
      <h1>{{ props.article.title }}</h1>
      <p>{{ props.article.body }}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>
