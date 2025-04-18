import type { Profile } from '~/types/Profile';
import { useQuery } from 'villus';
import { CLIENT_PROFILE } from '~/gql/queries/profile';

export const useProfileStore = defineStore('profile', () => {
    const { setLocalCartToUser } = useCartStore();

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
        setLocalCartToUser();
    };

    const setProfile = async () => {
        return new Promise<void>((resolve, reject) => {
            const { data, error, execute } = useQuery<{
                clientProfile: Profile;
            }>({
                query: CLIENT_PROFILE,
            });

            const errorUnwatch = watch(error, async (err) => {
                if (err) {
                    if (err.message.includes('Unauthorized')) {
                        console.warn('setProfile: Unauthorized, token may be invalid or not applied');
                        if (cookieToken.value) {
                            console.log('setProfile: Retrying query...');
                            await execute();
                        }
                    } else {
                        errorUnwatch();
                        dataUnwatch();
                        reject(err);
                    }
                }
            });

            const dataUnwatch = watch(data, async (data) => {
                if (data?.clientProfile) {
                    console.log('setProfile: Data received', data.clientProfile);
                    profile.value = data.clientProfile;
                    errorUnwatch();
                    dataUnwatch();
                    resolve();
                }
            });
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
