<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <form @submit.prevent="signIn">
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
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStorage } from "@/helper";
import { postSignIn } from "@/services";
import { AuthResponse, SignInForm, UserData } from "@/type";
import { onMounted, reactive } from "vue";

const form = reactive<SignInForm>({
  email: "",
  password: "",
});

const signIn = async () => {
  const { data } = await postSignIn({ user: form });

  const stringify = JSON.stringify(data);
  localStorage.setItem("condotiUser", stringify);
};

onMounted(() => {
  const storage = new UserStorage();

  const userData = storage.getStorage<AuthResponse<UserData>>("condotiUser");

  console.log(userData?.user.email);
});
</script>
