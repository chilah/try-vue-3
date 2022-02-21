<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/">
        <a class="navbar-brand">conduit</a>
      </router-link>

      <ul class="nav navbar-nav pull-xs-right">
        <li v-for="nav in navLinks" :key="nav.name" class="nav-item">
          <template v-if="nav.auth === isAuthenticated">
            <router-link :to="nav.path">
              <a
                :class="{
                  'nav-link': true,
                  active: nav.path === path,
                }"
                href=""
              >
                <i v-if="nav.icon" :class="nav.icon"></i>
                {{ nav.name }}
              </a>
            </router-link>
          </template>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from "@/composable";
import { computed } from "vue";
import { useRoute } from "vue-router";

interface NavLink {
  name: string;
  path: string;
  param?: string;
  auth: boolean;
  icon?: string;
}

const { isAuthenticated, userInfo } = useAuth();
const route = useRoute();
const path = computed<string>(() => route.path);

const navLinks = computed<NavLink[]>(() => [
  {
    name: "Home",
    path: "/",
    auth: true,
  },
  {
    name: "New Article",
    path: "/editor",
    auth: true,
    icon: "ion-compose",
  },
  {
    name: "Settings",
    path: "/settings",
    auth: true,
    icon: "ion-gear-a",
  },
  {
    name: userInfo.value?.username ?? "Profile",
    path: `/profile/${userInfo.value?.username}`,
    auth: true,
  },
  {
    name: "Sign In",
    path: "/login",
    auth: false,
  },
  {
    name: "Sign Up",
    path: "/register",
    auth: false,
  },
]);
</script>
