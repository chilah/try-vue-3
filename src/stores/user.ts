import { UserStorage } from "@/helper";
import { UserData } from "@/type";
import { defineStore } from "pinia";
import { useLocalStorage, RemovableRef, useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: useStorage<RemovableRef<UserData>>("user", null),
      // user: useStorage("user", null as RemovableRef<UserData | null>),
      count: 0,
    };
  },
  getters: {
    getUserData(state) {
      // return JSON.parse() ;
      return state.user;
    },
  },
  actions: {
    setUserData(data: UserData) {
      // this.user = data;
    },
  },
});
