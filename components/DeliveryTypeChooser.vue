<script setup lang="ts">
import type { Shop } from '~/types/Shop';
import { SHOP_LIST } from '~/gql/queries/shop';
import type { DeliveryType } from '~/types/Profile';

const deliveryTypes: DeliveryType[] = [
    {
        key: 'pickup',
        title: 'Самовывоз',
    },
    {
        key: 'delivery',
        title: 'Доставка',
    },
];
const activeDeliveryTypeOption = ref<DeliveryType>(deliveryTypes[1]);

const { items: shops } = useListQuery<Shop>(SHOP_LIST);

const deliveryAddressString = ref('');
const additionalDeliveryData = ref({
    apartment: null,
    entrance: null,
    floor: null,
    intercom: null,
});
const comment = ref('');
</script>

<template>
    <div class="delivery-options">
        <h3 class="h3">Выберите тип доставки</h3>
        <BaseTabsChooser v-model="activeDeliveryTypeOption" :tabs="deliveryTypes" item-key="key">
            <template #btn="{ item }">
                <div class="option">
                    <span class="option__title">{{ item.title }}</span>
                </div>
            </template>
        </BaseTabsChooser>
        <div v-if="activeDeliveryTypeOption.key === 'pickup'">
            <BaseButton :modifiers="['grey', 'icon']" class="w-100 mb-20"
                ><i class="icon-ya-maps color-primary"></i> На карте</BaseButton
            >
            <div v-if="shops">
                <ShopMiniCard v-for="shop in shops" :key="shop.id" :shop="shop" :is-active="shop.id === shops[0].id" />
            </div>
        </div>
        <div v-if="activeDeliveryTypeOption.key === 'delivery'">
            <BaseButton :modifiers="['grey', 'icon']" class="w-100 mb-20"
                ><i class="icon-ya-maps color-primary"></i> На карте</BaseButton
            >
            <div class="form">
                <FormInput
                    class="mb-20"
                    v-model="deliveryAddressString"
                    name="delivery-address"
                    placeholder="Адрес доставки"
                />
                <FormRadioButton class="mb-20" name="is-house" label="Частный дом?" />
                <div class="grid grid--cols-2 gap-10 mb-10">
                    <FormInput
                        v-model="additionalDeliveryData.apartment"
                        name="house-number"
                        placeholder="Квартира/Офис"
                    />
                    <FormInput v-model="additionalDeliveryData.entrance" name="house-number" placeholder="Подъезд" />
                    <FormInput v-model="additionalDeliveryData.floor" name="house-number" placeholder="Этаж" />
                    <FormInput v-model="additionalDeliveryData.intercom" name="house-number" placeholder="Домофон" />
                </div>
                <FormTextarea class="mb-20" v-model="comment" placeholder="Комментарий" name="delivery-comment" />
                <BaseButton :modifiers="['primary']" class="w-100">Сохранить</BaseButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
