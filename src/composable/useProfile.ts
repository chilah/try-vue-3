import { getProfile, postFollowUser, postUnfollowUser } from "@/services";
import { IProfile } from "@/type";
import { computed, ComputedRef, Ref, ref, watch } from "vue";
import { useAuth } from ".";

interface UseProfileProps {
  username: ComputedRef<string>;
}

interface UsableProfile {
  profileInfo: Ref<IProfile | undefined>;
  isCurrentUser: ComputedRef<boolean>;
  hasFollowed: ComputedRef<boolean>;
  followUser: () => Promise<void>;
}

export const useProfile = ({ username }: UseProfileProps): UsableProfile => {
  const { userInfo } = useAuth();
  const profileInfo = ref<IProfile>();

  const getCurrentProfile = async () => {
    try {
      if (!username.value) return;

      const {
        data: { profile },
      } = await getProfile(username.value);

      profileInfo.value = profile;
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async () => {
    try {
      if (profileInfo.value?.username) {
        let profileResponse: IProfile | undefined;

        if (profileInfo.value.following) {
          const {
            data: { profile },
          } = await postUnfollowUser(profileInfo.value.username);

          profileResponse = profile;
        } else {
          const {
            data: { profile },
          } = await postFollowUser(profileInfo.value.username);

          profileResponse = profile;
        }

        profileInfo.value = profileResponse;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCurrentUser = computed<boolean>(() => {
    if (userInfo.value?.username === profileInfo.value?.username) {
      return true;
    }

    return false;
  });

  const hasFollowed = computed<boolean>(() => {
    if (profileInfo.value?.following) {
      return true;
    }

    return false;
  });

  watch(username, getCurrentProfile, { immediate: true });

  return {
    profileInfo,
    isCurrentUser,
    hasFollowed,
    followUser,
  };
};
