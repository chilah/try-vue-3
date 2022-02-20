import { defineStore } from "pinia";

export const useApp = defineStore("app", {
  state: () => {
    return {
      loading: false as boolean,
    };
  },
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    setLoading(status: boolean) {
      this.loading = status;
    },
  },
});
