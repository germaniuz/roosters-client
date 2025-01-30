<script setup lang="ts"></script>

<template>
    <div class="cart-summary card card--grey card--p-md">
        <div class="cart-summary__top">
            <div class="cart-summary__quantity">2 товара</div>
            <div class="cart-summary__clean-cart">Очистить корзину <BaseIcon name="close" /></div>
        </div>
        <div class="cart-summary__price">
            <span>Сумма заказа</span>
            <span>2 400 ₽</span>
        </div>
        <div class="cart-summary__info">
            <span class="cart-summary__info-title">Скидка</span>
            <span class="cart-summary__info-data">-300 ₽</span>
        </div>
        <div class="cart-summary__info">
            <span class="cart-summary__info-title">Промокод</span>
            <span class="cart-summary__info-data">-500 ₽</span>
        </div>
        <div class="cart-summary__info">
            <span class="cart-summary__info-title">Использовано баллов</span>
            <span class="cart-summary__info-data">-100 <BaseIcon name="pizza-slice" /></span>
        </div>
        <div class="cart-summary__info">
            <span class="cart-summary__info-title">Начислим баллов</span>
            <span class="cart-summary__info-data cart-summary__info-data--add">+1 <BaseIcon name="pizza-slice" /></span>
        </div>
        <div class="cart-summary__final-price">
            Итого
            <span>1 600 ₽</span>
        </div>
        <NuxtLink class="btn btn--primary cart-summary__btn" to="placing-order">Перейти коформлению</NuxtLink>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.cart-summary {
    position: relative;

    @include media.md-down {
        margin-bottom: 30px;
    }
}

.cart-summary__top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.cart-summary__quantity {
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(20);
    font-weight: 400;
    line-height: functions.rem(24);
}

.cart-summary__clean-cart {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--c-grey40);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: functions.rem(14);
    cursor: pointer;
    transition: all 0.1s ease-in;

    i {
        font-size: functions.rem(18);
    }

    &:hover {
        color: var(--c-primary);
    }
}

.cart-summary__price {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--c-grey30);
    margin-bottom: 20px;

    @include media.lg-up {
        font-size: functions.rem(14);
        line-height: functions.rem(17);
    }
}

.cart-summary__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 400;
    margin-bottom: 8px;

    @include media.md-up {
        margin-bottom: 10px;
    }

    @include media.lg-up {
        font-size: functions.rem(14);
        line-height: functions.rem(17);
    }
}

.cart-summary__info-data {
    color: var(--c-primary);

    &--add {
        color: var(--c-secondary);
        font-weight: 700;
    }

    i {
        font-size: functions.rem(16);
        color: var(--c-primary);

        &::before {
            margin: 0;
        }
    }
}

.cart-summary__final-price {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-block: 20px;
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    line-height: functions.rem(19);
    font-weight: 400;

    span {
        color: var(--c-grey80);
        font-family: var(--f-base);
        font-size: functions.rem(20);
        line-height: functions.rem(24);
        font-weight: 600;
        font-style: italic;
    }
}

.cart-summary__btn {
    width: 100%;
}
</style>
