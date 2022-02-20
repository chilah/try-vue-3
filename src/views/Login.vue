<script setup lang="ts">
import { useAuth } from "@/composable";
import { postSignIn } from "@/services";
import { SignInForm } from "@/type";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { updateUser } = useAuth();

const isSuccess = ref<boolean | null>(null);

const form = reactive<SignInForm>({
  email: "sawasdee@sawasdee.com",
  password: "sawasdee",
});

const signIn = async () => {
  try {
    const {
      data: { user },
    } = await postSignIn({ user: form });

    updateUser(user);

    router.push(`/profile/${user.username}`);
  } catch (error) {
    isSuccess.value = false;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>

          <ul v-if="isSuccess === false" class="error-messages">
            <li>That email/password is invalid</li>
          </ul>

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
