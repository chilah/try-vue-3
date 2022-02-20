<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="update">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />

          <button class="btn btn-outline-danger" @click="onLogout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composable";
import router from "@/router";
import { updateSetting } from "@/services";
import { SettingsForm } from "@/type";
import { onMounted, reactive } from "vue";

const { userInfo, updateUser } = useAuth();

const form = reactive<SettingsForm>({
  image: userInfo.value?.image ?? "",
  username: userInfo.value?.username ?? "",
  bio: userInfo.value?.bio ?? "",
  email: userInfo.value?.email ?? "",
  password: "",
});

const update = async () => {
  const {
    data: { user },
  } = await updateSetting({ user: form });

  updateUser(user);
};

const onLogout = () => {
  updateUser(null);

  router.push("/");
};

onMounted(() => {
  if (!userInfo.value) {
    router.push("/login");
  }
});
</script>
