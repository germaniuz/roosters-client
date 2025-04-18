export default defineNuxtRouteMiddleware(async () => {
    const profileStore = useProfileStore();
    const { setProfile } = profileStore;
    const { cookieToken, isAuthenticated } = storeToRefs(profileStore);

    if (cookieToken.value && !isAuthenticated.value) {
        console.log('auth middleware');

        await setProfile();
    }
});
