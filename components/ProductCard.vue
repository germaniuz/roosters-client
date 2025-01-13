<script setup lang="ts">
import type { Product } from '~/types/Product';
import { useProductStore } from '~/stores/product';

type Props = {
    product: Product;
};
const props = defineProps<Props>();

const price = computed(() =>
    props.product.product_category_options.reduce((min, option) => {
        return option.price < min ? option.price : min;
    }, props.product.product_category_options[0].price),
);

const { openProductDialog } = useProductStore();
</script>

<template>
    <div class="product-card">
        <div class="product-card__image">
            <img :src="product.file.url" :alt="product.name" />
            <BaseBadge image="/images/test-badge.webp" />
        </div>
        <div class="product-card__title">{{ product.name }}</div>
        <div class="product-card__description">
            <span v-for="ingredient in product.product_ingredients" :key="ingredient.id"
                >{{ ingredient.ingredient.name }},
            </span>
        </div>
        <div class="product-card__price-block">
            <BaseButton :modifiers="['item']" class="product-card__price-btn" @click="openProductDialog(product)"
                >от {{ price }} ₽
            </BaseButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/components/buttons';

.product-card {
    display: grid;
    border-radius: var(--b-radius);
    transition: all 0.2s ease-in-out;
    grid-template-columns: 130px 1fr;
    grid-column-gap: 20px;
    padding-block: 15px;
    grid-template-areas:
        'product-card__image product-card__title'
        'product-card__image product-card__description'
        'product-card__image .'
        'product-card__image product-card__price-block';

    @include media.lg-up {
        grid-template-columns: unset;
        grid-template-rows: 180px repeat(3, min-content);
        grid-template-areas:
            'product-card__image'
            'product-card__title'
            'product-card__description'
            'product-card__price-block'
            'product-card__price-block';
        padding: 15px;
        align-items: center;
    }

    @include media.xl-up {
        grid-template-rows: 218px auto;
    }

    &:hover {
        background-color: var(--c-grey05);
    }
}

.product-card__image {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    grid-area: product-card__image;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transform: scale(0.95);
        transition: all 0.2s ease-in-out;

        .product-card:hover & {
            transform: scale(1);
        }
    }
}

.product-card__title {
    color: var(--c-grey80);
    font-family: var(--f-base), serif;
    font-size: functions.rem(16);
    font-weight: 400;
    line-height: normal;
    margin-bottom: 8px;
    grid-area: product-card__title;

    @include media.lg-up {
        font-size: functions.rem(20);
        margin-bottom: 10px;
        margin-top: 20px;
        text-align: center;
    }
}

.product-card__description {
    color: var(--c-grey50);
    font-family: var(--f-headings), serif;
    font-size: functions.rem(10);
    font-weight: 500;
    line-height: 1.35;
    margin-bottom: 12px;
    grid-area: product-card__description;

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
    grid-area: product-card__price-block;

    @include media.lg-up {
        flex-direction: column-reverse;
        gap: 10px;
    }
}

.product-card__price-btn {
    display: inline-block;
    position: relative;
    font-family: var(--f-base), serif;
    font-size: functions.rem(14);
    padding: 6px 25px;
    width: 100%;
    max-width: 150px;
    font-weight: 600;
    font-style: italic;
    line-height: normal;

    @include media.lg-up {
        padding: 10px;
    }

    @include media.xl-up {
        font-size: functions.rem(16);
        max-width: 170px;
    }

    .product-card:hover & {
        @extend .btn--primary;

        @include media.lg-up {
            max-width: 100%;
        }
    }
}

.product-card__old-price {
    color: var(--c-grey50);
    font-family: var(--f-base), serif;
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
