import { getProfile } from "@/services";
import { IProfile } from "@/type";
import { computed, ComputedRef, onMounted, Ref, ref, watch } from "vue";
import { useAuth } from ".";

interface UseProfileProps {
  username: ComputedRef<string>;
}

interface UsableProfile {
  profileInfo: Ref<IProfile | undefined>;
  toggleFollowBtn: ComputedRef<boolean>;
}

export const useProfile = ({ username }: UseProfileProps): UsableProfile => {
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

  watch(username, getCurrentProfile, { immediate: true });

  return {
    profileInfo,
    toggleFollowBtn,
  };
};
