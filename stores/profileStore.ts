import type { Profile } from '~/types/Profile';
import { useQuery } from 'villus';
import { CLIENT_PROFILE } from '~/gql/queries/profile';

export const useProfileStore = defineStore('profile', () => {
    const { fetchUserCart } = useCartStore();

    const profile = ref<Profile | null>(null);

    const cookieToken = useCookie('villus:default.token');
    const token = ref<string | null>(cookieToken.value ?? null);

    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !token.value);

    // dialog states
    const isAuthDialogActive = ref(false);
    const isCodeVerificationDialogActive = ref(false);

    const setProfile = async (newToken: string) => {
        const { data: profileData } = await useQuery<{
            clientProfile: Profile;
        }>({
            query: CLIENT_PROFILE,
        });
        if (profileData.value?.clientProfile) {
            profile.value = profileData.value.clientProfile;
            token.value = newToken;

            await fetchUserCart();
        }
    };

    const logout = () => {
        cookieToken.value = null;
        token.value = null;
        profile.value = null;
    };

    return {
        token,
        profile,
        isAuthenticated,
        isGuest,
        isAuthDialogActive,
        isCodeVerificationDialogActive,
        setProfile,
        logout,
    };
});
