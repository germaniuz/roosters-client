import { useQuery } from 'villus';
import { CLIENT_PROFILE } from '~/gql/queries/clientProfile';
import type { DeliveryType, Profile, UserAddress, UserAddressFields } from '~/types/Profile';
import type { Shop } from '~/types/Shop';

export const useProfileStore = defineStore('profile', () => {
    const { fetchUserCart } = useCartStore();
    const profile = ref<Profile | null>(null);
    const token = ref('');
    // auth routine
    watch(token, (newToken) => {
        console.log('newToken', newToken);
        if (newToken && !profile.value) {
            token.value = newToken;
            nextTick(async () => {
                const { data } = await useQuery({
                    query: CLIENT_PROFILE,
                });
                profile.value = data.value?.clientProfile;
                fetchUserCart();
            });
        }
    });

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
    const deliveryAddresses = ref<UserAddress[]>([]); // TODO add user address type
    const activeDeliveryAddress = ref<UserAddress | null>(null);

    const isAuthDialogActive = ref(false);
    const isCodeVerificationDialogActive = ref(false);

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
        isAuthDialogActive,
        isCodeVerificationDialogActive,
        setProfile,
    };
});
