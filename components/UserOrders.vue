<script lang="ts" setup>
import { ORDER_STATUS } from '~/constants/order';
import { ORDER_LIST } from '~/gql/queries/order';
import type { Order } from '~/types/Order';

const { items: orders, count: ordersCount } = useListQuery<Order>(ORDER_LIST);
const currentOrders = computed<Array<Order>>(() => {
    return orders.value.filter(
        (order) =>
            order.status !== ORDER_STATUS.CANCELLED ||
            order.status !== ORDER_STATUS.REFUND ||
            order.status !== ORDER_STATUS.COMPLETED,
    );
});

const isOrdersDialogShowed = ref(false);
</script>

<template>
    <div class="card card--p-md card--grey profile__user-orders-history">
        <div class="text14 g50">История заказов</div>
        <span>Всего заказов: {{ ordersCount }}</span>
        <BaseButton :modifiers="['secondary']" @click="isOrdersDialogShowed = true">Посмотреть все</BaseButton>
    </div>
    <OrdersCurrent :orders="currentOrders" class="profile__user-order" />
    <BaseDialog v-model:is-active="isOrdersDialogShowed" @close="isOrdersDialogShowed = false">
        <div class="order-list">
            <OrderCard v-for="order in orders" :key="order.id" :order="order" :show-actions="false" />
        </div>
    </BaseDialog>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.profile__user-orders-history {
    grid-area: user-orders-history;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 163px;

    @include media.md-up {
        min-height: unset;
    }

    span {
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(20);
        line-height: functions.rem(24);
        font-weight: 400;
        color: var(--c-grey70);
        margin-bottom: 15px;

        @include media.lg-up {
            font-size: functions.rem(24);
            line-height: functions.rem(28);
        }

        @include media.xl-up {
            font-size: functions.rem(32);
            line-height: functions.rem(38);
        }
    }

    button {
        margin-top: auto;
    }
}

.profile__user-order {
    grid-area: user-order;
    min-height: 190px;

    @include media.lg-up {
        min-height: 206px;
    }
}

.order-list {
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>
