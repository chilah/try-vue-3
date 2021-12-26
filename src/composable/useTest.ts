import { getProfile } from "@/services";
import { IProfileResponse } from "@/type";
import { ref } from "vue";

const useTest = () => {
  const user = ref<IProfileResponse>();

  async function fetchProfile() {
    const { data } = await getProfile("hallo");

    user.value = data;
  }
  return { user, fetchProfile };
};

export default useTest;
