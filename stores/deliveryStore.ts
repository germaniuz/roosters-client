import type { DeliveryType, UserAddress } from '~/types/Profile';
import { StorageSerializers, useStorage } from '@vueuse/core';
import type { Shop } from '~/types/Shop';
import { skipHydrate } from 'pinia';
import { IS_PICKUP_SHOP_OPEN } from '~/gql/queries/shop';
import { useQuery } from 'villus';

export const useDeliveryStore = defineStore('delivery', () => {
    const isDeliveryChooserOpen = ref(false);
    const deliveryTypes = shallowRef<DeliveryType[]>([
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

    const deliveryLocalStorage = useStorage<UserAddress | null>('delivery-data', null, undefined, {
        serializer: StorageSerializers.object,
    });
    let pickupLocalStorage: Ref<Shop | null> = ref(null);
    pickupLocalStorage = useStorage<Shop | null>('pickup-data', null, undefined, {
        serializer: StorageSerializers.object,
    });
    const activeShop = ref<Shop | null>(null);
    const isActiveShopWorking = ref<boolean | null>(null);

    // check if shop is active
    watch(
        activeShop,
        async () => {
            if (activeShop.value) {
                const { data: isWorking } = await useQuery({
                    query: IS_PICKUP_SHOP_OPEN,
                    variables: {
                        shop_id: activeShop.value.id,
                    },
                });
                isActiveShopWorking.value = isWorking.value;
            }
        },
        {
            deep: true,
        },
    );

    return {
        isDeliveryChooserOpen,
        deliveryTypes,
        activeDeliveryType,
        activeShop,
        isActiveShopWorking,
        deliveryLocalStorage: skipHydrate(deliveryLocalStorage),
        pickupLocalStorage: skipHydrate(pickupLocalStorage),
    };
});
