<script setup lang="ts">
import { useProfile } from "@/composable";
import { ArticleDetail } from "@/type";
import { computed, toRefs } from "vue";

interface Props {
  article?: ArticleDetail;
}

interface Emits {
  (e: "update"): () => void;
  (e: "delete"): () => void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { article } = toRefs(props);

const { isCurrentUser, hasFollowed, followUser } = useProfile({
  username: computed(() => article?.value?.author.username ?? ""),
});

const date = computed(() => {
  if (article?.value) {
    return new Date(article?.value.createdAt).toLocaleString();
  }

  return "";
});
</script>
<template>
  <div class="article-meta">
    <router-link :to="`/profile/${article?.author.username}`">
      <a href=""><img :src="article?.author.image" /></a>
      <div class="info">
        <a class="author">{{ article?.author.username }}</a>
        <span class="date">{{ date }} </span>
      </div>
    </router-link>

    <button
      v-if="!isCurrentUser"
      class="btn btn-sm btn-outline-secondary"
      @click="followUser"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ hasFollowed ? "Unfollow" : "Follow" }}
      {{ article?.author.username }}
      <span class="counter">{{
        `(${article?.author.followedBy?.length})`
      }}</span>
    </button>
    &nbsp;

    <template v-if="isCurrentUser">
      <router-link :to="`/editor/${article?.slug}`">
        <button
          aria-label="Edit article"
          class="btn btn-outline-secondary btn-sm space"
          name="edit-article"
        >
          <i class="ion-edit space" /> Edit Article
        </button>
      </router-link>
    </template>
    &nbsp;

    <button class="btn btn-sm btn-outline-primary" @click="emits('update')">
      <i class="ion-heart"></i>
      &nbsp; {{ article?.favorited ? "Unfavorite Post" : "Favorite Post" }}
      <span class="counter">{{ `(${article?.favoritesCount})` }}</span>
    </button>
    &nbsp;

    <button
      v-if="isCurrentUser"
      aria-label="Delete article"
      class="btn btn-outline-danger btn-sm"
      @click="emits('delete')"
    >
      <i class="ion-trash-a" /> Delete Article
    </button>
  </div>
</template>
