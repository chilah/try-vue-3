<script setup lang="ts">
import { useArticle } from "@/composable";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ArticleMeta from "@/components/ArticleMeta.vue";
import router from "@/router";

const route = useRoute();
const slug = computed<string>(() => route.params.slug as string);

const commentForm = ref<string>("");

const {
  getArticleBySlug,
  articleDetail,
  comments,
  getCommentsBySlug,
  submitComment,
  submitFavorite,
  submitDeleteArticle,
} = useArticle();

const onSubmitComment = async () => {
  await submitComment(slug.value, commentForm.value);
  commentForm.value = "";
};

const onSubmitFollow = () => {
  if (articleDetail.value) {
    submitFavorite(
      null,
      articleDetail.value.slug,
      articleDetail.value.favorited
    );
  }
};

const onSubmitDelete = async () => {
  if (articleDetail.value) {
    await submitDeleteArticle(articleDetail.value.slug);

    router.push("/");
  }
};

onMounted(() => {
  Promise.all([getArticleBySlug(slug.value), getCommentsBySlug(slug.value)]);
});
</script>

<template>
  <div class="article-page">
    <div v-if="articleDetail" class="banner">
      <div class="container">
        <h1>{{ articleDetail?.title }}</h1>

        <ArticleMeta
          :article="articleDetail"
          @update="onSubmitFollow"
          @delete="onSubmitDelete"
        />
      </div>
    </div>

    <div v-if="articleDetail" class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ articleDetail?.body }}
          </p>

          <ul v-for="tag in articleDetail?.tagList" :key="tag" class="tag-list">
            <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta
          :article="articleDetail"
          @update="onSubmitFollow"
          @delete="onSubmitDelete"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" @submit.prevent="onSubmitComment">
            <div class="card-block">
              <textarea
                v-model="commentForm"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div v-for="comment in comments" :key="comment.body" class="card">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">{{
                comment.author.username
              }}</a>
              <span class="date-posted">{{ comment.createAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
