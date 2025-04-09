export default defineNuxtRouteMiddleware(async () => {
    const cookieToken = useCookie('villus:default.token');
    const { setProfile } = useProfileStore();

    if (cookieToken.value) {
        await setProfile(cookieToken.value);
    }
});
