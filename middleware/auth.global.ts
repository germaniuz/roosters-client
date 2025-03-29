import { CLIENT_PROFILE } from '~/gql/queries/profile';
import type { Profile } from '~/types/Profile';
import { useQuery } from 'villus';

export default defineNuxtRouteMiddleware(async () => {
    const token = useCookie('villus:default.token');
    const { setProfile } = useProfileStore();

    if (token.value) {
        const { data: profileData } = await useQuery<{
            clientProfile: Profile;
        }>({
            query: CLIENT_PROFILE,
        });

        if (profileData.value?.clientProfile) {
            setProfile(profileData.value.clientProfile);
        }
    }
});
