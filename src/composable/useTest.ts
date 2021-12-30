import { getProfile } from "@/services";
import { IProfileResponse } from "@/type";
import { ref, reactive, toRef, toRefs } from "vue";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTest = () => {
  const user = ref<IProfileResponse>();
  const state = reactive<IProfileResponse>({ profile: undefined });

  async function fetchProfile() {
    const { data } = await getProfile("hallo");

    user.value = data;
    state.profile = data.profile;
  }

  const { profile } = toRefs(state);

  return { user, fetchProfile, state, profile };
};

export default useTest;
