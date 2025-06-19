<script setup lang="ts">
import BaseIconButton from '~/components/BaseIconButton.vue';
import type { Order } from '~/types/Order';

type Props = {
    orders: Order[];
};
const props = defineProps<Props>();

const orderNumber = ref(1);
const ordersQuantity = computed(() => props.orders.length);

const activeOrder = computed<Order>(() => props.orders[orderNumber.value - 1]);

type RecommendedItem = {
    name: string;
    image: string;
};

const recommendedItems = ref<Array<RecommendedItem>>([
    {
        name: 'Диабло',
        image: '/images/test-pizza.webp',
    },
    {
        name: 'Овощная',
        image: '/images/test-pizza.webp',
    },
    {
        name: 'Мясная',
        image: '/images/test-pizza.webp',
    },
]);

const handlePrevBtnClick = () => {
    orderNumber.value = orderNumber.value > 1 ? orderNumber.value - 1 : ordersQuantity.value;
};

const handleNextBtnClick = () => {
    console.log(orderNumber.value, ordersQuantity.value);
    orderNumber.value = orderNumber.value < ordersQuantity.value ? orderNumber.value + 1 : 1;
};
</script>

<template>
    <div class="order-card">
        <div v-if="activeOrder" class="active-order">
            <div class="card card--p-md card--grey order-card__actual-order">
                <div class="text14 g50">Актуальные заказы:</div>
                <div class="order-card__orders-quantity">
                    <BaseIcon name="angle-left" @click="handlePrevBtnClick()" />
                    <div class="order-card__orders-quantity-number">
                        {{ orderNumber }} <span v-if="ordersQuantity > 1">/ {{ ordersQuantity }}</span>
                    </div>
                    <BaseIcon name="angle-right" @click="handleNextBtnClick()" />
                </div>
            </div>
            <div class="order-card__actual-order-info">
                <OrderCard :order="activeOrder" />
                <div v-if="ordersQuantity > 1" class="order-card__actual-order-info-stack"></div>
            </div>
        </div>
        <div v-if="!activeOrder" class="card card--p-lg card--grey no-active-orders">
            <img src="/images/sad-face.webp" alt="no-orders" />
            <div class="order-card__no-active-orders-title">Нет активных заказов</div>
            <div class="text14 g50">
                Попробуйте наши новинки в <a class="link link--secondary" href="#">каталоге</a>
            </div>
            <div class="order-card__recommended-to-order-block">
                <div
                    v-for="recommendedItem in recommendedItems"
                    :key="recommendedItem.name"
                    class="order-card__recommended-to-order"
                >
                    <img :src="recommendedItem.image" alt="" />
                    <span class="order-card__recommended-to-order-name">{{ recommendedItem.name }}</span>
                    <span class="order-card__recommended-to-order-plus">+</span>
                </div>
                <BaseIconButton
                    icon="three-dots-horizontal"
                    class="order-card__more-info-btn order-card__more-info-btn--lg"
                ></BaseIconButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.active-order {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    height: 100%;

    @include media.md-only {
        grid-template-columns: 0.4fr 0.6fr;
    }

    @include media.lg-up {
        grid-template-columns: 200px 1fr;
    }
}

.no-active-orders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    img {
        width: 37px;
        height: 20px;
        margin-bottom: 2px;
    }
}

.order-card__actual-order {
    display: flex;
    flex-direction: column;
}

.order-card__orders-quantity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: auto;

    i {
        color: var(--c-grey40);
        cursor: pointer;
        transition: all 0.2s ease-in;

        &:hover {
            color: var(--c-grey60);
        }
    }
}

.order-card__orders-quantity-number {
    color: var(--c-grey70);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(32);
    font-style: italic;
    font-weight: 600;
    line-height: normal;

    span {
        color: var(--c-grey50);
    }
}

.order-card__actual-order-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include media.md-up {
        flex-direction: row;
    }
}

.order-card__actual-order-info-stack {
    height: 7px;
    width: 80%;
    border-right: 1px solid var(--c-grey20);
    border-bottom: 1px solid var(--c-grey20);
    border-left: 1px solid var(--c-grey20);
    border-radius: 0 0 10px 10px;

    @include media.md-up {
        height: 80%;
        width: 7px;
        border-left: unset;
        border-top: 1px solid var(--c-grey20);
        border-right: 1px solid var(--c-grey20);
        border-bottom: 1px solid var(--c-grey20);
        border-radius: 0 10px 10px 0;
    }
}

.order-card__no-active-orders-title {
    color: var(--c-grey70);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(24);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 5px;

    @include media.lg-up {
        font-size: functions.rem(32);
    }
}

.order-card__recommended-to-order-block {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.order-card__recommended-to-order {
    border-radius: var(--b-radius-md);
    background: var(--c-grey00);
    display: flex;
    flex-direction: row;
    padding: 5px 15px 5px 5px;
    gap: 10px;
    align-items: center;

    @include media.sm-down {
        &:not(:first-child) {
            display: none;
        }
    }

    img {
        width: 38px;
        height: 38px;
    }
}

.order-card__recommended-to-order-name {
    color: var(--c-grey50);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
}

.order-card__recommended-to-order-plus {
    color: var(--c-secondary);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
}
</style>
