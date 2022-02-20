import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/settings",
    name: "Setting",
    component: () => import("../views/Settings.vue"),
  },
  {
    path: "/profile/:username",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/article/:slug",
    name: "Article",
    component: () => import("../views/Article.vue"),
  },
  {
    path: "/editor/:slug",
    name: "Edit-Editor",
    component: () => import("../views/Editor.vue"),
  },
  {
    path: "/editor/",
    name: "Create-Editor",
    component: () => import("../views/Editor.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
