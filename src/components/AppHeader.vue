<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <router-link to="/">
          <li class="nav-item"><a class="nav-link active" href="">Home</a></li>
        </router-link>

        <router-link to="/about">
          <li class="nav-item">
            <a class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
        </router-link>

        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>

        <router-link v-if="!isAuthenticated" to="/signin">
          <li class="nav-item"><a class="nav-link" href="">Sign in</a></li>
        </router-link>

        <router-link v-if="!isAuthenticated" to="/signup" active-class="active">
          <li class="nav-item"><a class="nav-link" href="">Sign up</a></li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from "@/composable";

const { isAuthenticated, userInfo, state } = useAuth();
</script>
