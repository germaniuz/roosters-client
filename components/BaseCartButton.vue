<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore';

const { cartCount, cartPrice } = storeToRefs(useCartStore());
</script>

<template>
    <div v-if="cartCount" class="cart-btn">
        <NuxtLink class="btn btn--primary cart-btn__btn" to="/cart">
            <div class="cart-btn__icon"><img src="/images/cart.svg" alt="" /></div>
            <div class="cart-btn__text">
                В корзине<span>{{ cartPrice }}₽</span>
            </div>
            <BaseIcon name="arrow-right" />
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.cart-btn {
    position: fixed;
    z-index: var(--z-top-20);
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 20px;
    padding-inline: 20px;
    height: max-content;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgb(255, 255, 255) 100%);

    @include media.md-up {
        left: unset;
        background: unset;
    }

    i {
        font-size: functions.rem(26);
    }
}

.cart-btn__btn {
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    border-radius: var(--b-radius-round);
    padding: 12px 20px;
    width: 100%;

    @include media.md-up {
        box-shadow: 0px 0px 42px 1px rgba(255, 255, 255, 0.6);
    }
}

.cart-btn__icon {
    height: 30px;
    aspect-ratio: 1;

    img {
        height: 100%;
        object-fit: contain;
    }
}

.cart-btn__text {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    text-align: left;
    color: var(--c-grey10);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(12);
    font-weight: 400;
    line-height: functions.rem(14);

    @include media.lg-up {
        margin-right: 40px;
    }

    span {
        font-size: functions.rem(20);
        font-weight: 600;
        line-height: functions.rem(24);
        font-style: italic;
    }
}
</style>
