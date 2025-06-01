<script lang="ts" setup>
import { ORDER_LIST } from '~/gql/queries/order';
import type { Order } from '~/types/Order';
import { REPEAT_ORDER } from '~/gql/mutations/order';
import { useMutation } from 'villus';

const { t } = useI18n();
const route = useRoute();
const orderId = +route.params.id;

const { dropLocalCart, fetchUserCart } = useCartStore();
const { items: orders } = useListQuery<Order>(ORDER_LIST, {
    variables: {
        ids: [orderId],
    },
});

const order = computed(() => {
    return orders.value[0];
});

const isThanksDialogShowed = ref(true);

const { execute: repeatOrderMutation } = useMutation(REPEAT_ORDER);
async function repeatOrder() {
    const res = await repeatOrderMutation({
        order_id: orderId,
    });
    if (res.data) {
        dropLocalCart();
        await fetchUserCart();
    }
}
</script>

<template>
    <div v-if="order" class="container card card--shadows order">
        <div class="order__top">
            <h1 class="h1">Заказ №{{ order.id }}</h1>
            <div class="order__status">
                <span class="order__time">{{ getDateTimeString(order.created_at) }}</span
                ><br />
                {{ t(`order_status.${order.status}`) }}
            </div>
        </div>
        <div class="order__payment">
            {{ order.payment_type_text }} | {{ order.payment_date ? 'Оплачен' : 'Неоплачен' }}
        </div>

        <div class="order__delivery">{{ order.delivery_type_text }}</div>
        <div class="order__products">
            <div class="order__product" v-for="product in order.order_products" :key="product.id">
                <div class="order__product-image">
                    <img
                        :src="product.product_category_option.product?.file.url"
                        :alt="product.product_category_option.product.name"
                    />
                </div>
                <div class="order__product-name">{{ product.product_category_option.product.name }}</div>
                <div class="order__product-quantity"><i class="icon-close"></i>{{ product.quantity }}&nbsp;шт.</div>
                <div class="order__product-price">{{ product.price }}&nbsp;₽</div>
            </div>
        </div>
        <div class="order__comment" v-if="order.customer_comment">{{ order.customer_comment }}</div>
        <BaseButton :modifiers="['primary']" @click="repeatOrder">Повторить заказ</BaseButton>
    </div>
    <BaseDialog v-model:is-active="isThanksDialogShowed">
        <div class="card thanks">
            <div class="thanks__image">
                <img src="/images/like.svg" alt="Спасибо за заказ" />
            </div>
            <div class="thanks__title">Спасибо за заказ!</div>
            <p class="thanks__text">Мы ценим вашу обратную связь, она помогает нам становиться лучше</p>
            <BaseButton :modifiers="['primary']" @click="isThanksDialogShowed = false">Продолжить</BaseButton>
        </div>
    </BaseDialog>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.order {
    max-width: 790px;
    margin-bottom: 40px;
}

.order__top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .h1 {
        margin-bottom: 0;
    }
}

.order__status {
    text-transform: uppercase;
    font-size: functions.rem(18);
    font-weight: 300;
    color: var(--c-grey80);
}

.order__time {
    font-size: functions.rem(14);
    color: var(--c-grey70);
}

.order__payment {
    font-size: functions.rem(14);
    color: var(--c-grey70);
    margin-bottom: 4px;
}

.order__products {
    margin-bottom: 32px;
}

.order__product {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    padding-block: 12px;
    margin-top: 32px;

    & + & {
        border-top: 1px solid var(--c-grey20);
    }
}

.order__product-image {
    width: 150px;
    height: 150px;
    flex: 0 0 150px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.order__product-name {
    text-transform: uppercase;
    font-weight: 300;
    font-size: functions.rem(18);
    color: var(--c-grey90);
}

.order__product-quantity {
    font-size: functions.rem(14);
    color: var(--c-grey70);
    margin-left: auto;
}

.order__product-price {
    font-size: functions.rem(18);
    color: var(--c-grey90);
    font-weight: 300;
}

.order__comment {
    padding: 24px;
    background: var(--c-grey10);
    color: var(--c-grey80);
    font-size: functions.rem(14);
    border-radius: var(--b-radius);
    margin-block: 20px;
}

.thanks {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 450px;
}

.thanks__title {
    font-size: functions.rem(18);
    text-transform: uppercase;
    font-weight: 500;
    color: var(--c-secondary);
}

.thanks__text {
    font-size: functions.rem(14);
    color: var(--c-grey70);
    text-align: center;
}
</style>
