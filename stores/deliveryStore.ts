import type { DeliveryType, UserAddress } from '~/types/Profile';
import { StorageSerializers, useStorage } from '@vueuse/core';
import type { Shop } from '~/types/Shop';
import { skipHydrate } from 'pinia';

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
    // WARNING не полагаться на activeDeliveryType - используется для переключателя в компоненте выбора доставки и не отражает фактический выбор пользователя
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
