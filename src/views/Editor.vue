<script lang="ts" setup>
import { useArticle } from "@/composable";
import router from "@/router";
import { ArticleForm } from "@/type";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = computed<string | null>(() => {
  if (route.params.slug) {
    return route.params.slug as string;
  }

  return null;
});

const { getArticleBySlug, articleDetail, submitPostArticle, submitPutArticle } =
  useArticle();

const form = ref<ArticleForm>({
  title: "",
  description: "",
  body: "",
  tag: "",
  tagList: [],
});

const onBlurTagList = () => {
  if (form.value.tag) {
    form.value.tagList.push(form.value.tag);
    form.value.tag = "";
  }
};

const removeTag = (tagName: string) => {
  form.value.tagList = form.value.tagList.filter((tag) => tag !== tagName);
};

const onSubmitForm = async () => {
  if (slug.value) {
    await submitPutArticle(slug.value, form.value);
  } else {
    await submitPostArticle(form.value);
  }

  router.push(`/article/${articleDetail.value?.slug}`);
};

onMounted(async () => {
  if (slug.value) {
    await getArticleBySlug(slug.value);

    if (articleDetail.value) {
      form.value.body = articleDetail.value.body;
      form.value.title = articleDetail.value.title;
      form.value.description = articleDetail.value.description;
      form.value.tagList = articleDetail.value.tagList;
    }
  }
});
</script>

<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.tag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @blur="onBlurTagList"
                />
                <div class="tag-list">
                  <span
                    v-for="tag in form.tagList"
                    :key="tag"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)" />
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmitForm"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
