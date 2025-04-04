import type { Profile } from '~/types/Profile';

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile | null>(null);

    const cookieToken = useCookie('villus:default.token');
    const token = ref<string | null>(cookieToken.value ?? null);

    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !token.value);

    // dialog states
    const isAuthDialogActive = ref(false);
    const isCodeVerificationDialogActive = ref(false);

    const setProfile = (profileData: Profile) => {
        profile.value = profileData;
    };

    return {
        token,
        profile,
        isAuthenticated,
        isGuest,
        isAuthDialogActive,
        isCodeVerificationDialogActive,
        setProfile,
    };
});
