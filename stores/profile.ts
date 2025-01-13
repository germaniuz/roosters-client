import type { Profile } from '~/types/Profile';

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile | null>(null);
    const token = useCookie('apollo:default.token');
    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !token.value);
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
