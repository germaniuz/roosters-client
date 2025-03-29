import type { DeliveryType, Profile } from '~/types/Profile';
import type { Shop } from '~/types/Shop';

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<Profile | null>(null);
    const token = useCookie('apollo:default.token');
    const isAuthenticated = computed(() => !!profile.value);
    const isGuest = computed(() => !token.value);
    const deliveryTypes = ref<DeliveryType[]>([
        {
            key: 'delivery',
            title: 'Доставка',
        },
        {
            key: 'pickup',
            title: 'Самовывоз',
        },
    ]);
    const activeDeliveryType = ref<DeliveryType>(deliveryTypes.value[0]);
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
        deliveryTypes,
        activeDeliveryType,
        pickupShop,
        deliveryAddresses,
        activeDeliveryAddress,
        isDeliveryChooserOpen,
        setProfile,
    };
});
