import type { DeliveryType, UserAddress } from '~/types/Profile';
import { StorageSerializers, useStorage } from '@vueuse/core';
import type { Shop } from '~/types/Shop';
import { skipHydrate } from 'pinia';
import { DELIVERY_TYPE } from '~/constants/order';

export const useDeliveryStore = defineStore('delivery', () => {
    const isDeliveryChooserOpen = ref(false);
    const deliveryTypes = shallowRef<DeliveryType[]>([
        {
            key: DELIVERY_TYPE.DELIVERY,
            title: 'Доставка', // TODO: i18n
        },
        {
            key: DELIVERY_TYPE.PICKUP,
            title: 'Самовывоз', // TODO: i18n
        },
    ]);
    const activeDeliveryType = useStorage<DeliveryType>('activeDeliveryType', {
        key: DELIVERY_TYPE.DELIVERY,
        title: 'Доставка', // TODO: i18n
    });

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
        activeDeliveryType: skipHydrate(activeDeliveryType),
        activeShop,
        isActiveShopWorking,
        deliveryLocalStorage: skipHydrate(deliveryLocalStorage),
        pickupLocalStorage: skipHydrate(pickupLocalStorage),
    };
});
