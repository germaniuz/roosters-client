<script setup lang="ts">
import BaseIconButton from '~/components/BaseIconButton.vue';

const activeOrder = ref(1);
const orderNumber = ref(1);
const ordersQuantity = 3;

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
    orderNumber.value = orderNumber.value > 1 ? orderNumber.value - 1 : ordersQuantity;
};

const handleNextBtnClick = () => {
    orderNumber.value = orderNumber.value < ordersQuantity ? orderNumber.value + 1 : 1;
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
                <BaseButton :modifiers="['secondary']">Посмотреть все</BaseButton>
            </div>
            <div class="order-card__actual-order-info">
                <div class="card card--p-md card--outline order-card__actual-order-info-inner">
                    <div class="order-card__date-time">25.07.24, в 18:42</div>
                    <div class="order-card__delivery-time">~60 мин</div>
                    <div class="order-card__delivery">Доставка</div>
                    <div class="order-card__order-number">Заказ № 12345</div>
                    <div class="order-card__order-address">Ул. Рабоче-крестьянская, 31</div>
                    <div class="order-card__order-price"><span>1200₽</span> 1900₽</div>
                    <div class="order-card__more-info">
                        <BaseIconButton
                            icon="three-dots-horizontal"
                            :modifiers="['outline']"
                            class="order-card__more-info-btn"
                        ></BaseIconButton>
                        <div class="order-card__more-info-img">
                            <img src="/images/test-pizza.webp" alt="image" />
                        </div>
                    </div>
                </div>
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
    justify-content: space-between;
}

.order-card__orders-quantity {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

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
    font-family: var(--f-base);
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

.order-card__actual-order-info-inner {
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

.order-card__date-time {
    grid-area: order-date-time;
    color: var(--c-grey70);
    font-family: var(--f-base);
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
    font-family: var(--f-base);
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: normal;
}

.order-card__order-number {
    grid-area: order-number;
    color: var(--c-secondary);
    font-family: var(--f-base);
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
    font-family: var(--f-base);
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
    font-family: var(--f-base);
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
    font-family: var(--f-base);
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
        font-family: var(--f-base);
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

.order-card__no-active-orders-title {
    color: var(--c-grey70);
    font-family: var(--f-base);
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
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-weight: 400;
    line-height: normal;
}

.order-card__recommended-to-order-plus {
    color: var(--c-secondary);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
}
</style>
