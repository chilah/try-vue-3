<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul v-if="isSuccess === false" class="error-messages">
            <li>That email/username is already taken</li>
          </ul>

          <form id="register-form" @submit.prevent="register">
            <fieldset class="form-group">
              <input
                v-model="registerForm.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="registerForm.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="registerForm.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuth } from "@/composable";
import { postSignUp } from "@/services";
import { SignUpForm } from "@/type";
import { reactive, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const isSuccess = ref<boolean | null>(null);

    const registerForm = reactive<SignUpForm>({
      username: "sawasdee",
      email: "sawasdee@sawasdee.com",
      password: "sawasdee",
    });

    const register = async () => {
      try {
        const {
          data: { user },
        } = await postSignUp({ user: registerForm });

        const { updateUser } = useAuth();
        updateUser(user);

        router.push("/profile");
      } catch (error) {
        isSuccess.value = false;
      }
    };

    return {
      registerForm,
      register,
      isSuccess,
    };
  },
});
</script>
