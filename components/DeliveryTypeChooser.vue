<script setup lang="ts">
import type { Shop } from '~/types/Shop';
import { SHOP_LIST } from '~/gql/queries/shop';
import { type UserAddressFields, UserAddressFieldsSchema } from '~/types/Profile';
import { useStorage } from '@vueuse/core';

const { pickupShop, deliveryTypes, activeDeliveryType, activeDeliveryAddress, isDeliveryChooserOpen } =
    storeToRefs(useProfileStore());

const { items: shops } = useListQuery<Shop>(SHOP_LIST);

const userAddressFields = ref<UserAddressFields>({
    city: '',
    street: '',
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

const isCottage = ref(false);
watch(isCottage, (newValue) => {
    if (newValue) {
        userAddressFields.value.apartment = '';
        userAddressFields.value.entrance = '';
        userAddressFields.value.floor = '';
        userAddressFields.value.intercom_code = '';
    }
});

const isDeliveryMapActive = ref(false);
const coordinates = ref<[number, number] | null>(null);
const getSuggestionsByCoords = (coords: [number, number]) => {
    coordinates.value = coords;
};
const deliveryLocalStorage = useStorage('delivery-data', { ...userAddressFields.value }, localStorage);
const pickupLocalStorage = useStorage('pickup-data', { ...pickupShop.value }, localStorage);

const saveDeliveryTypeData = () => {
    const _result = validate();
    if (Object.keys(formErrors.value).length === 0) {
        deliveryLocalStorage.value = userAddressFields.value;
        pickupLocalStorage.value = null;
        pickupShop.value = null;
        activeDeliveryAddress.value = {
            address: {
                city: userAddressFields.value.city,
                street: userAddressFields.value.street,
                house: userAddressFields.value.house,
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
        };
        isDeliveryChooserOpen.value = false;
    } else {
        console.log(formErrors.value);
    }
};

const isShopMapActive = ref(false);
const setPickupShop = (shop: Shop) => {
    pickupShop.value = shop;
    pickupLocalStorage.value = shop;
};
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
        <div v-if="activeDeliveryType.key === 'delivery'" class="delivery">
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
        <div class="pickup" v-if="activeDeliveryType.key === 'pickup'">
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
                        :is-active="shop.id === pickupShop?.id"
                        @click="setPickupShop(shop)"
                    />
                </div>
            </div>
            <div v-if="isShopMapActive" class="pickup__map">
                <ShopsMap :active-shop="pickupShop" @set-shop="setPickupShop" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.delivery {
    min-width: 350px;
    display: flex;
    gap: 20px;
}

.delivery__form {
    min-width: 350px;
}

.pickup {
    display: flex;
    gap: 20px;
}
</style>
