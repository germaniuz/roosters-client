import type { Profile } from '~/types/Profile';

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile | null>(null);
    const token = useCookie('token');
    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !profile.value);
    const setProfile = (profileData: Profile) => {
        profile.value = profileData;
    };

    return {
        token,
        profile,
        isAuthenticated,
        isGuest,
        setProfile,
    };
});
