import type { Profile } from '~/types/Profile';
import { useQuery } from 'villus';
import { CLIENT_PROFILE } from '~/gql/queries/profile';

export const useProfileStore = defineStore('profile', () => {
    const { fetchUserCart } = useCartStore();

    const profile = ref<Profile | null>(null);

    const cookieToken = useCookie('villus:default.token');

    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !cookieToken.value);

    // dialog states
    const isAuthDialogActive = ref(false);
    const isCodeVerificationDialogActive = ref(false);

    const authenticateUser = async (token: string) => {
        cookieToken.value = token;
        isCodeVerificationDialogActive.value = false;
        await setProfile();
    };

    const setProfile = async () => {
        const { data, error, execute } = useQuery<{
            clientProfile: Profile;
        }>({
            query: CLIENT_PROFILE,
        });
        watch(error, (err) => {
            if (err) {
                if (err.message.includes('Unauthorized')) {
                    console.warn('setProfile: Unauthorized, token may be invalid or not applied');
                    if (cookieToken.value) {
                        console.log('setProfile: Retrying query...');
                        execute();
                    }
                }
            }
        });
        watch(data, async (data) => {
            if (data?.clientProfile) {
                profile.value = data.clientProfile;
                await fetchUserCart(); // TODO: think to move it to middleware
            }
        });
    };

    const logout = () => {
        cookieToken.value = null;
        profile.value = null;
    };

    return {
        cookieToken,
        profile,
        isAuthenticated,
        isGuest,
        isAuthDialogActive,
        isCodeVerificationDialogActive,
        authenticateUser,
        setProfile,
        logout,
    };
});
