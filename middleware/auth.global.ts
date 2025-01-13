import { CLIENT_PROFILE } from '~/gql/queries/profile';
import type { Profile } from '~/types/Profile';

export default defineNuxtRouteMiddleware(async () => {
    const { data: profileData, execute: getProfile } = useLazyAsyncQuery<{
        clientProfile: Profile;
    }>(CLIENT_PROFILE);
    const { setProfile } = useProfileStore();

    const token = useCookie('apollo:default.token');
    console.log(token.value);

    if (token.value) {
        await getProfile();
        if (profileData.value?.clientProfile) {
            setProfile(profileData.value.clientProfile);
        }
    }
});
