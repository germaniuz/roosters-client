<script setup lang="ts">
import type { Product } from '~/types/Product';
import { useProductStore } from '~/stores/product';

type Props = {
    product: Product;
    disabled?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
});

const price = computed(() =>
    props.product.product_category_options.reduce((min, option) => {
        return option.price < min ? option.price : min;
    }, props.product.product_category_options[0].price),
);

const ingredients = computed(
    () => props.product.description + ', ' + props.product.product_ingredients.map((i) => i.ingredient.name).join(', '),
);

const { openProductDialog } = useProductStore();
</script>

<template>
    <div class="product-card" :class="{ 'product-card--disabled': disabled }" @click="openProductDialog(product)">
        <div class="product-card__image">
            <img :src="product.file.url" :alt="product.name" />
            <BaseBadge
                v-if="product.badges"
                class="product-card__badge"
                :image="product.badges[0].file.url"
                :alt="product.badges[0].file.name"
            />
        </div>
        <div class="product-card__title">{{ product.name }}</div>
        <div class="product-card__description">
            {{ ingredients }}
        </div>
        <div class="product-card__price-block">
            <span class="product-card__price"> от {{ price }} ₽</span>
            <BaseButton :modifiers="['item']" class="product-card__price-btn" @click="openProductDialog(product)">
                Выбрать
            </BaseButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/components/buttons';

.product-card {
    display: flex;
    flex-direction: column;
    border-radius: var(--b-radius);
    transition: all 0.2s ease-in-out;
    grid-template-columns: 130px 1fr;
    grid-column-gap: 20px;
    cursor: pointer;
    padding: 8px;
    background: var(--c-grey00);

    @include media.md-up {
        padding: 8px 18px;
    }

    @include media.xl-up {
        grid-template-rows: 218px auto;
    }

    &:hover {
        @include media.lg-up {
            background-color: var(--c-grey05);
        }
    }

    &--disabled {
        opacity: 0.5;
        pointer-events: none;
    }
}

.product-card__badge {
    position: absolute;
    top: 0;
    right: 0;
}

.product-card__image {
    position: relative;
    width: 100%;
    height: auto;
    max-width: 100%;
    aspect-ratio: 1;
    overflow: hidden;

    @include media.sm-down {
        margin-bottom: 8px;
    }

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
    color: var(--c-grey100);
    font-family: var(--f-base), serif;
    font-size: functions.rem(16);
    font-weight: 500;
    line-height: normal;
    margin-bottom: 8px;

    @include media.lg-up {
        font-size: functions.rem(18);
        margin-bottom: 10px;
        margin-top: 20px;
    }
}

.product-card__description {
    color: var(--c-grey60);
    font-family: var(--f-headings), serif;
    font-size: functions.rem(10);
    font-weight: 500;
    line-height: 1.35;
    margin-bottom: auto;

    @include media.lg-up {
        margin-bottom: 20px;
        font-size: functions.rem(14);
    }
}

.product-card__price-block {
    margin-top: auto;
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
}

.product-card__price {
    font-size: functions.rem(16);
    color: var(--c-grey100);
    font-weight: 500;

    @include media.lg-up {
        font-size: functions.rem(18);
    }
}

.product-card__price-btn {
    display: inline-block;
    position: relative;
    font-family: var(--f-base), serif;
    font-size: functions.rem(14);
    padding: 6px 10px;
    width: 100%;
    max-width: 150px;
    font-weight: 600;
    font-style: italic;
    line-height: normal;
    background: var(--c-grey00);
    border: 1px solid var(--c-primary);

    @include media.lg-up {
        padding: 10px;
    }

    @include media.xl-up {
        font-size: functions.rem(16);
        max-width: 120px;
    }

    .product-card:hover & {
        @extend .btn--primary;
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
