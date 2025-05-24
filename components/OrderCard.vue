<script setup lang="ts">
import BaseIconButton from '~/components/BaseIconButton.vue';
import type { Order } from '~/types/Order';
import { ORDER_PATH } from '~/constants/routing';

type Props = {
    order: Order;
    showActions?: boolean;
};
withDefaults(defineProps<Props>(), {
    showActions: true,
});
const { t } = useI18n();
</script>

<template>
    <NuxtLink :to="`${ORDER_PATH}/${order.id}`" class="card card--p-md card--outline order-card">
        <div class="order-card__date-time">{{ getDateTimeString(order.created_at) }}</div>
        <div class="order-card__delivery">{{ t(`order_status.${order.status}`) }}</div>
        <div class="order-card__order-number">Заказ № {{ order.id }}</div>
        <div class="order-card__order-address">
            {{ order?.user_address?.address.street ?? order.shop.name }}
        </div>
        <div class="order-card__order-price">{{ order.amount }}&nbsp;₽</div>
        <div class="order-card__more-info">
            <BaseIconButton
                v-if="showActions"
                icon="three-dots-horizontal"
                :modifiers="['outline']"
                class="order-card__more-info-btn"
            ></BaseIconButton>
            <div v-for="product in order.order_products" :key="product.id" class="order-card__more-info-img">
                <img
                    :src="product.product_category_option.product.file.url"
                    :alt="product.product_category_option.product.name"
                />
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.order-card {
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: repeat(4, auto) 1fr;
    grid-template-areas:
        'order-date-time'
        'order-delivery-time'
        'order-delivery'
        'order-number'
        'order-more-info';

    @include media.md-up {
        grid-template-columns: max-content max-content 1fr;
        grid-template-areas:
            'order-date-time order-delivery-time order-price'
            'order-number order-number order-number'
            'order-delivery order-delivery order-delivery'
            'order-address order-address order-address'
            'order-more-info order-more-info order-more-info';
    }
}

.order-card__date-time {
    grid-area: order-date-time;
    color: var(--c-grey70);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 5px;

    @include media.md-up {
        margin-right: 15px;
    }

    @include media.lg-up {
        font-size: functions.rem(16);
        margin-bottom: 8px;
    }
}

.order-card__delivery {
    grid-area: order-delivery;
    color: var(--c-grey50);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: normal;
}

.order-card__order-number {
    grid-area: order-number;
    color: var(--c-secondary);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;

    @include media.md-up {
        margin-bottom: 10px;
    }

    @include media.lg-up {
        font-size: functions.rem(24);
    }
}

.order-card__delivery-time {
    grid-area: order-delivery-time;
    color: var(--c-secondary-extra-dark);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;

    @include media.md-up {
        margin-bottom: unset;
    }

    @include media.lg-up {
        font-size: functions.rem(16);
    }
}

.order-card__more-info {
    grid-area: order-more-info;
    margin-top: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.order-card__more-info-img {
    width: 38px;
    height: 38px;
    padding: 5px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.order-card__order-address {
    grid-area: order-address;
    color: var(--c-grey70);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;

    @include media.sm-down {
        display: none;
    }
}

.order-card__order-price {
    grid-area: order-price;
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-style: italic;
    font-weight: 600;
    line-height: normal;
    text-align: right;

    @include media.sm-down {
        display: none;
    }

    span {
        color: var(--c-grey50);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(14);
        font-style: italic;
        font-weight: 500;
        line-height: normal;
        position: relative;
        margin-right: 8px;

        &::before {
            content: '';
            position: absolute;
            top: 45%;
            right: -3px;
            border-bottom: 1px solid var(--c-grey50);
            width: 110%;
            transform: rotate(-10deg);
        }
    }
}

.order-card__more-info-btn {
    height: 37px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        font-size: functions.rem(3);
        position: relative;
        left: -5px;
    }

    &--lg {
        height: 50px;
        background-color: var(--c-grey00);
        transition: all 0.2s ease-in;

        &:hover {
            * {
                color: var(--c-primary);
            }
        }

        * {
            font-size: functions.rem(4);
            position: relative;
            left: -7px;
            top: 2px;
            color: var(--c-secondary);
            transition: all 0.2s ease-in;
        }
    }
}
</style>
