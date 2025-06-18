<script lang="ts" setup>
import { ORDER_LIST } from '~/gql/queries/order';
import type { Order } from '~/types/Order';
import { REPEAT_ORDER } from '~/gql/mutations/order';
import { useMutation } from 'villus';
import { PROFILE_PATH } from '~/constants/routing';

const { t } = useI18n();
const route = useRoute();
const orderId = +route.params.id;

const { dropLocalCart, fetchUserCart } = useCartStore();
const { items: orders } = useListQuery<Order>(ORDER_LIST, {
    ids: [orderId],
});

const order = computed(() => {
    return orders.value[0];
});

const isThanksDialogShowed = ref(false);

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
            <h1 class="h1 order__heading">
                <span>Заказ №{{ order.id }}</span>
                <NuxtLink class="order__back-btn" :to="PROFILE_PATH"><i class="icon-close"></i></NuxtLink>
            </h1>
            <div class="order__status">
                <span class="order__time">{{ getDateTimeString(order.created_at) }}</span
                ><br />
                <span :class="`order__${order.status}`">{{ t(`order_status.${order.status}`) }}</span>
            </div>
        </div>
        <div class="order__payment">
            {{ order.payment_type_text }} | {{ order.payment_date ? 'Оплачен' : 'Неоплачен' }}
        </div>

        <div class="order__delivery">{{ order.delivery_type_text }}</div>
        <div class="order__products">
            <div class="order__product" v-for="product in order.order_products" :key="product.id">
                <div class="order__product-image">
                    <!--                    <img-->
                    <!--                        :src="product.product_category_option.product?.file.url"-->
                    <!--                        :alt="product.product_category_option.product.name"-->
                    <!--                    />-->
                    <img
                        src="https://api.roosters-dev.ru/downloads/5e4/5e44bd249c1ee103a7b5da79ac363e61.png"
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
    max-width: 640px;
    margin-bottom: 40px;

    @include media.md-down {
        margin: 12px;
    }
}

.order__top {
    display: flex;
    justify-content: space-between;

    @include media.sm-down {
        flex-direction: column;
    }

    @include media.md-up {
        align-items: center;
    }

    .h1 {
        margin-bottom: 0;
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: functions.rem(22);
    }
}

.order__back-btn {
    color: var(--c-grey80);
    font-size: functions.rem(22);

    @include media.lg-up {
        display: none;
    }
}

.order__status {
    font-size: functions.rem(18);
    color: var(--c-grey80);

    @include media.lg-up {
        font-weight: 300;
        text-transform: uppercase;
    }
}

.order__NEW {
    color: var(--c-secondary);
}

.order__CONFIRMED {
    color: var(--c-secondary);
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
    padding-block: 16px 12px;
    margin-top: 32px;

    @include media.md-up {
        gap: 32px;
    }

    & + & {
        border-top: 1px solid var(--c-grey20);
    }
}

.order__product-image {
    width: 80px;
    height: 80px;
    flex: 0 0 80;
    position: relative;
    top: -8px;

    @include media.md-up {
        width: 124px;
        height: 124px;
        flex: 0 0 124px;
        top: -12px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.order__product-name {
    color: var(--c-grey90);
}

.order__product-quantity {
    font-size: functions.rem(14);
    color: var(--c-grey70);
    margin-left: auto;
}

.order__product-price {
    color: var(--c-grey90);
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
