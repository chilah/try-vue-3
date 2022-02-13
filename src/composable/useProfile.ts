import { getProfile } from "@/services";
import { IProfile } from "@/type";
import { computed, ComputedRef, onMounted, ref, watch } from "vue";
import { useAuth } from ".";

interface UseProfileProps {
  username: ComputedRef<string>;
}

export const useProfile = ({ username }: UseProfileProps) => {
  const { userInfo } = useAuth();
  const profileInfo = ref<IProfile>();

  const getCurrentProfile = async () => {
    try {
      const {
        data: { profile },
      } = await getProfile(username.value);

      profileInfo.value = profile;
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFollowBtn = computed<boolean>(() => {
    if (userInfo.value?.username === profileInfo.value?.username) {
      return false;
    }

    return true;
  });

  onMounted(() => {
    getCurrentProfile();
  });

  watch(username, getCurrentProfile);

  return {
    profileInfo,
    toggleFollowBtn,
  };
};
