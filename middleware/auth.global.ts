export default defineNuxtRouteMiddleware(async () => {
    const profileStore = useProfileStore();
    const { setProfile } = profileStore;
    const { cookieToken, isAuthenticated } = storeToRefs(profileStore);
    const { fetchUserCart } = useCartStore();

    if (cookieToken.value && !isAuthenticated.value) {
        if (import.meta.client) {
            await setProfile();
            await fetchUserCart();
        }
    }
});
