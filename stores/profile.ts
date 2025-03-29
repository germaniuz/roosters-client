import type { DeliveryMethod, Profile } from '~/types/Profile';
import type { Shop } from '~/types/Shop';

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile | null>(null);
    const token = useCookie('apollo:default.token');
    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !token.value);
    const deliveryType = ref<DeliveryMethod>('pickup');
    const pickupShop = ref<null | Shop>(null);
    const deliveryAddresses = ref<Array<Record<string, unknown>>>([]); // TODO add user address type
    const activeDeliveryAddress = ref(null);
    const setProfile = (profileData: Profile) => {
        profile.value = profileData;
    };
    const isDeliveryChooserOpen = ref(false);

    return {
        token,
        profile,
        isAuthenticated,
        isGuest,
        setProfile,
        deliveryType,
        pickupShop,
        deliveryAddresses,
        activeDeliveryAddress,
        isDeliveryChooserOpen,
    };
});
