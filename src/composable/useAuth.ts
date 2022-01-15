import { UserStorage } from "@/helper";
import { AuthResponse, UserData } from "@/type";
import { computed, onMounted, reactive, ref, toRef, watch } from "vue-demi";

const userStorage = new UserStorage("user");

const initState: Partial<AuthResponse<UserData | null>> = {
  user: null,
};

const state = reactive(initState);

export const useAuth = () => {
  const updateUser = (data: UserData) => {
    userStorage.setStorage(data);
    state.user = data;
  };

  const isAuthenticated = computed(() => !!state.user?.token);

  onMounted(() => {
    if (!state.user) {
      state.user = userStorage.getStorage();
    }
  });

  return {
    userInfo: toRef(state, "user"),
    updateUser,
    isAuthenticated,
  };
};
