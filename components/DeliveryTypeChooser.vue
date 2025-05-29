<script setup lang="ts">
import type { Shop } from '~/types/Shop';
import { CURRENT_GEOZONE_SHOP, IS_PICKUP_SHOP_OPEN, SHOP_LIST } from '~/gql/queries/shop';
import { type UserAddressFields, UserAddressFieldsSchema } from '~/types/Profile';
import { useDeliveryStore } from '~/stores/deliveryStore';
import { useQuery } from 'villus';
import { DELIVERY_TYPE } from '~/constants/order';

const {
    deliveryTypes,
    activeDeliveryType,
    deliveryLocalStorage,
    pickupLocalStorage,
    activeShop,
    isActiveShopWorking,
    isDeliveryChooserOpen,
} = storeToRefs(useDeliveryStore());

// have to be an await, because in onMounted we need a shopList to set active Shop
const { items: shops } = await useAsyncListQuery<Shop>(SHOP_LIST);

const isCottage = ref(false);
const userAddressFields = ref<UserAddressFields>({
    fias_id: '',
    city: '',
    street: '',
    street_type: '',
    house: '',
    location: {
        longitude: 0,
        latitude: 0,
    },
    apartment: '',
    entrance: '',
    floor: '',
    intercom_code: '',
    comment: '',
});
const { validate, formErrors } = useValidateFormData<UserAddressFields>(userAddressFields, UserAddressFieldsSchema);

watch(isCottage, (newValue) => {
    if (newValue) {
        userAddressFields.value.apartment = '';
        userAddressFields.value.entrance = '';
        userAddressFields.value.floor = '';
        userAddressFields.value.intercom_code = '';
    }
});

const isDeliveryMapActive = ref(false);
const isShopMapActive = ref(false);

const coordinates = ref<[number, number] | null>(null);
const getSuggestionsByCoords = (coords: [number, number]) => {
    coordinates.value = coords;
};

const saveDeliveryTypeData = async () => {
    validate();
    if (Object.keys(formErrors.value).length === 0) {
        deliveryLocalStorage.value = {
            address: {
                fias_id: userAddressFields.value.fias_id,
                city: userAddressFields.value.city,
                street: userAddressFields.value.street,
                house: userAddressFields.value.house,
                street_type: userAddressFields.value.street_type,
                location: {
                    latitude: userAddressFields.value.location.latitude,
                    longitude: userAddressFields.value.location.longitude,
                },
            },
            apartment: userAddressFields.value.apartment ?? '',
            entrance: userAddressFields.value.entrance ?? '',
            floor: userAddressFields.value.floor ?? '',
            intercom_code: userAddressFields.value.intercom_code ?? '',
            comment: userAddressFields.value.comment ?? '',
            is_current: true,
            is_active: true,
        };
        isDeliveryChooserOpen.value = false;
        pickupLocalStorage.value = null;
        activeShop.value = null;
        const { data: shopResponse } = await useQuery<{ currentGeozoneDeliveryShop: Shop | null }>({
            query: CURRENT_GEOZONE_SHOP,
            variables: {
                longitude: userAddressFields.value.location.longitude,
                latitude: userAddressFields.value.location.latitude,
            },
        });
        if (shopResponse.value?.currentGeozoneDeliveryShop) {
            activeShop.value = shopResponse.value.currentGeozoneDeliveryShop;
            isActiveShopWorking.value = !!shopResponse.value.currentGeozoneDeliveryShop;
        } else {
            isActiveShopWorking.value = false;
        }
    } else {
        console.error(formErrors.value);
    }
};

const setPickupShop = async (shop: Shop) => {
    pickupLocalStorage.value = shop;
    activeShop.value = shop;
    const { data: isWorking } = await useQuery<{ isPickupShopOpen: boolean }>({
        query: IS_PICKUP_SHOP_OPEN,
        variables: {
            shop_id: shop.id,
        },
    });
    isActiveShopWorking.value = isWorking?.value?.isPickupShopOpen ?? null;
    isDeliveryChooserOpen.value = false;
};

onMounted(async () => {
    // set shop from localStorage
    if (pickupLocalStorage?.value?.id && activeDeliveryType.value.key === DELIVERY_TYPE.PICKUP) {
        // get shop from requested shopList for having up-to-date stopList
        // @ts-expect-error pickupLocalStorage.value, but we check it in if statement
        const shopIndex = shops.value.findIndex((shop) => shop.id === pickupLocalStorage.value.id);
        if (shopIndex !== -1) {
            await setPickupShop(shops.value[shopIndex]);
        }
    }
    // set address from localStorage
    if (activeDeliveryType.value.key === DELIVERY_TYPE.DELIVERY && deliveryLocalStorage.value) {
        const { data: shopResponse } = await useQuery<{ currentGeozoneDeliveryShop: Shop | null }>({
            query: CURRENT_GEOZONE_SHOP,
            variables: {
                longitude: userAddressFields.value.location.longitude,
                latitude: userAddressFields.value.location.latitude,
            },
        });
        if (shopResponse.value?.currentGeozoneDeliveryShop) {
            activeShop.value = shopResponse.value.currentGeozoneDeliveryShop;
            isActiveShopWorking.value = !!shopResponse.value.currentGeozoneDeliveryShop;
        } else {
            isActiveShopWorking.value = false;
        }
    }
});
</script>

<template>
    <div class="delivery-options">
        <h3 class="h3">Выберите тип доставки</h3>
        <BaseTabsChooser v-model="activeDeliveryType" :tabs="deliveryTypes" item-key="key">
            <template #btn="{ item }">
                <div class="option">
                    <span class="option__title">{{ item.title }}</span>
                </div>
            </template>
        </BaseTabsChooser>
        <div v-if="activeDeliveryType.key === DELIVERY_TYPE.DELIVERY" class="delivery">
            <div class="delivery__form">
                <BaseButton
                    :modifiers="[isDeliveryMapActive ? 'secondary-light' : 'grey', 'icon']"
                    class="w-100 mb-20"
                    @click="isDeliveryMapActive = !isDeliveryMapActive"
                    ><i class="icon-ya-maps color-primary"></i> На карте</BaseButton
                >
                <div class="form">
                    <FormAddress
                        v-model="userAddressFields"
                        name="delivery-address"
                        placeholder="Адрес доставки"
                        :coordinates="coordinates"
                        :form-errors="formErrors"
                    />
                    <FormRadioButton v-model="isCottage" class="mb-20" name="is-house" label="Частный дом?" />
                    <div v-if="!isCottage" class="grid grid--cols-2 gap-10 mb-10">
                        <FormInput
                            v-model="userAddressFields.apartment"
                            name="house-number"
                            placeholder="Квартира/Офис"
                        />
                        <FormInput v-model="userAddressFields.entrance" name="house-number" placeholder="Подъезд" />
                        <FormInput v-model="userAddressFields.floor" name="house-number" placeholder="Этаж" />
                        <FormInput
                            v-model="userAddressFields.intercom_code"
                            name="house-number"
                            placeholder="Домофон"
                        />
                    </div>
                    <FormTextarea
                        v-model="userAddressFields.comment"
                        class="mb-20"
                        placeholder="Комментарий"
                        name="delivery-comment"
                    />
                    <BaseButton :modifiers="['primary']" class="w-100" @click="saveDeliveryTypeData"
                        >Сохранить</BaseButton
                    >
                </div>
            </div>
            <div v-if="isDeliveryMapActive" class="delivery__map">
                <UserAddressMap v-model="userAddressFields" @set-coordinates="getSuggestionsByCoords" />
            </div>
        </div>
        <div v-if="activeDeliveryType.key === DELIVERY_TYPE.PICKUP" class="pickup">
            <div class="pickup__form">
                <BaseButton
                    :modifiers="[isShopMapActive ? 'secondary-light' : 'grey', 'icon']"
                    class="w-100 mb-20"
                    @click="isShopMapActive = !isShopMapActive"
                    ><i class="icon-ya-maps color-primary"></i> На карте</BaseButton
                >
                <div v-if="shops">
                    <ShopMiniCard
                        v-for="shop in shops"
                        :key="shop.id"
                        :shop="shop"
                        :is-active="shop.id === pickupLocalStorage?.id"
                        @click="setPickupShop(shop)"
                    />
                </div>
            </div>
            <div v-if="isShopMapActive" class="pickup__map">
                <ShopsMap :active-shop="pickupLocalStorage" @set-shop="setPickupShop" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.delivery-options {
    --delivery-block-min-width: 300px;
    width: 100%;
}

.delivery {
    min-width: var(--delivery-block-min-width);
    display: flex;
    gap: 20px;
    width: 100%;
}

.delivery__form {
    min-width: var(--delivery-block-min-width);
    width: 100%;
}

.pickup {
    display: flex;
    gap: 20px;
    min-width: var(--delivery-block-min-width);
    width: 100%;
}
</style>
