<script lang="ts" setup>
import { PRODUCT_FULL_LIST } from '~/gql/queries/product';
import type { Product } from '~/types/Product';

const { items } = useListQuery<Product>(PRODUCT_FULL_LIST);
const { activeShop, isActiveShopWorking } = storeToRefs(useDeliveryStore());

const headerCategories = ref(['Сеты', 'Пицца', 'Шашлык', 'Закуски', 'Напитки', 'Акции']);

const products = computed(() => {
    const productList: {
        inStock: Product[];
        outStock: Product[];
    } = {
        inStock: [],
        outStock: [],
    };
    if (!activeShop.value) {
        productList.inStock = [...items.value];
    } else {
        items.value.forEach((product) => {
            const stopIndex = activeShop.value?.product_stoplist.findIndex((stopProduct) => {
                return stopProduct.product.id === product.id;
            });
            if (stopIndex !== -1) {
                productList.outStock.push(product);
            } else {
                productList.inStock.push(product);
            }
        });
    }

    return productList;
});
</script>

<template>
    <div class="container front-page">
        <AppStories />
        <PopularItems />
        <div class="header__categories">
            <div v-for="headerCategory in headerCategories" :key="headerCategory" class="header__category">
                {{ headerCategory }}
            </div>
        </div>
    </div>
    <ClientOnly>
        <div v-if="items" class="grid grid--product-test">
            <ProductCard
                v-for="product in products.inStock"
                :key="product.id"
                :product="product"
                :disabled="!isActiveShopWorking && !!activeShop"
            />
            <ProductCard v-for="product in products.outStock" :key="product.id" :product="product" :disabled="true" />
        </div>
    </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.front-page__stories {
    position: relative;
    margin-bottom: 30px;

    @include media.md-up {
        margin-bottom: 60px;
    }

    @include media.lg-up {
        margin-bottom: 80px;
    }
}

.front-page__stories-grid {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow: auto;
    margin-inline: calc(var(--pi-container-xs) * -1);
    padding-inline: var(--pi-container-xs);
    scroll-behavior: smooth;

    @include media.md-up {
        margin-inline: calc(var(--pi-container-md) * -1);
        padding-inline: var(--pi-container-md);
        gap: 15px;
    }

    @include media.lg-up {
        margin-inline: calc(var(--pi-container-lg) * -1);
        padding-inline: var(--pi-container-lg);
        gap: 20px;
    }

    @include media.xl-up {
        margin-inline: 0;
        padding-inline: 0 80px;
        gap: 20px;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        transition: all 0.1s ease-in;

        @include media.xl-up {
            background: var(--c-gradient-white-right);
            opacity: 1;
        }
    }

    &::-webkit-scrollbar {
        @include media.lg-up {
            display: none;
        }
    }
}

.front-page__story {
    min-width: 130px;
    height: 170px;
    background-color: var(--c-grey50);
    border-radius: var(--b-radius);

    @include media.md-up {
        min-width: 180px;
        height: 244px;
    }

    @include media.lg-up {
        min-width: 208px;
        height: 276px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.front-page__stories-scroll-btn {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    height: 38px;
    aspect-ratio: 1;
    background-color: var(--c-grey00);
    border-radius: var(--b-radius-round);
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease-in;
    z-index: var(--z-middle);

    @include media.md-down {
        display: none;
    }

    &:hover {
        background-color: var(--c-primary);
        color: var(--c-grey00);
    }
}

.front-page__stories-scroll-left-btn {
    left: -20px;
}

.front-page__stories-scroll-right-btn {
    right: -20px;
}

.front-page__cart-btn {
    position: fixed;
    bottom: 30px;
    right: 50px;
    z-index: var(--z-top-20);
}

.header__categories {
    display: flex;
    flex-direction: row;
    gap: 18px;
    overflow-x: auto;
    padding-block: 0 5px;
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.2s ease-in-out;
    margin-bottom: 12px;
    margin-top: 8px;

    @include media.md-down {
        .header--mobile-menu-active & {
            transform: scaleY(0);
            position: absolute;
        }
    }

    @include media.lg-up {
        padding-block: 10px;
        gap: 32px;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.header__category {
    color: var(--c-grey90);
    font-size: functions.rem(16);
    cursor: pointer;
    position: relative;
    font-weight: 500;

    &:hover {
        color: var(--c-primary);
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        translate: -50%;
        width: 50%;
        height: 2px;
        background-color: transparent;
        border-radius: var(--b-radius-round);
        transition: all 0.2s ease-in-out;
    }

    @include media.lg-up {
        &::after {
            height: 4px;
        }
    }
}
</style>
