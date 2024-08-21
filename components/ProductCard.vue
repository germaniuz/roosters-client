<script setup lang="ts">
import type { Product } from '~/types/Product';

type Props = {
    product: Product;
}

defineProps<Props>()

</script>

<template>
    <div class="product-card">
        <div class="product-card__image">
            <img :src="product.image" :alt="product.name">
            <span class="product-card__tag"></span>
        </div>
        <div class="product-card__info">
            <div class="product-card__title">{{product.name}}</div>
            <div class="product-card__description">
                <span v-for="ingredient in product.ingredients">{{ingredient}}, </span>
            </div>
            <div class="product-card__price-block">
                <BaseButton modifiers="item" class="product-card__price">от {{product.price}} ₽</BaseButton>
                <div class="product-card__old-price">{{product.price}}₽</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.product-card {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding-block: 15px;

    @include media.lg-up {
        flex-direction: column;
        padding: 15px;
        align-items: center;
    }
}

.product-card__image {
    width: 130px;
    aspect-ratio: 1;
    overflow: hidden;
    flex-shrink: 0;

    @include media.lg-up {
        width: 180px;
    }

    @include media.xl-up {
        width: 218px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.product-card__info {
    display: flex;
    flex-direction: column;
}

.product-card__title {
    color: var(--c-grey80);
    font-family: var(--f-base);
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 8px;

    @include media.lg-up {
        font-size: functions.rem(20);
        margin-bottom: 10px;
        text-align: center;
    }
}

.product-card__description {
    color: var(--c-grey50);
    font-family: var(--f-headings);
    font-size: functions.rem(10);
    font-weight: 500;
    line-height: 1.35;
    margin-bottom: 12px;

    @include media.lg-up {
        margin-bottom: 30px;
        font-size: functions.rem(13);
    }
}

.product-card__price-block {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;

    @include media.lg-up {
        flex-direction: column-reverse;
        gap: 10px;
    }
}

.product-card__price {
    font-family: var(--f-base);
    font-size: functions.rem(14);
    padding: 6px 25px;
    width: 100%;
    max-width: 150px;
    font-weight: 600;
    font-style: italic;
    line-height: normal;

    @include media.lg-up {
        padding: 10px 35px;
        width: unset;
        max-width: unset;
    }

    @include media.xl-up {
        font-size: functions.rem(16);
        padding: 10px 44px;
    }
}

.product-card__old-price {
    color: var(--c-grey50);
    font-family: var(--f-base);
    font-size: functions.rem(14);
    font-style: italic;
    font-weight: 500;
    line-height: normal;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        left: -3px;
        bottom: 45%;
        width: 110%;
        height: 100%;
        border-bottom: 1px solid var(--c-grey50);
        transform: rotate(-9deg);
    }
}
</style>