<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li v-for="nav in navLinks" class="nav-item" :key="nav.name">
          <template v-if="nav.auth === isAuthenticated">
            <router-link :to="nav.path">
              <a class="nav-link active" href="">{{ nav.name }}</a>
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

interface NavLink {
  name: string;
  path: string;
  param?: string;
  auth: boolean;
}

const { isAuthenticated, userInfo } = useAuth();

const navLinks = computed<NavLink[]>(() => [
  {
    name: "Home",
    path: "/home",
    auth: false,
  },
  {
    name: "New ArticleDetail",
    path: "/editor",
    auth: true,
  },
  {
    name: "Settings",
    path: "/settings",
    auth: true,
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
