<script lang="ts" setup>
import CartSummary from '~/components/CartSummary.vue';
import { PRODUCT_LIST } from '~/gql/queries/product';
import type { Product } from '~/types/Product';
import type { QueryList } from '~/types/Query';

const { data: queriedProducts } = await useAsyncQuery<QueryList<Product>>(PRODUCT_LIST);
const { list: productList } = useGetQueriedList<QueryList<Product>, Product>(queriedProducts);
</script>

<template>
    <div class="container container--sm cart">
        <h1 class="h1">Корзина <span class="h1--grey h1--md-hidden">- Оформление - Заказ принят</span></h1>
        <div class="cart__grid">
            <div class="cart__items">
                <CartItem v-for="product in productList.items" :product="product" />
            </div>
            <PopularItems title="Рекомендуем добавить" class="cart__recommended" />
            <CartSummary class="cart__summary" />
            <ThePromocode class="cart__promocode" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.cart__grid {
    width: 100%;

    @include media.lg-up {
        display: grid;
        grid-template-columns: 1fr 350px;
        column-gap: 20px;
        row-gap: 30px;
        grid-template-areas:
            'items summary'
            'items promocode'
            'items .'
            'recommended recommended';
    }
}

.cart__items {
    grid-area: items;
    border-top: 1px solid var(--c-grey30);
    border-bottom: 1px solid var(--c-grey30);
    padding-block: 20px;
    margin-bottom: 40px;

    @include media.md-up {
        margin-bottom: 0;
    }

    @include media.xl-up {
        max-width: 700px;
    }

    > * {
        &:not(:last-child) {
            border-bottom: 1px solid var(--c-grey30);
            padding-bottom: 20px;
            margin-bottom: 20px;

            @include media.md-up {
                padding-bottom: 30px;
                margin-bottom: 30px;
            }
        }
    }
}

.cart__recommended {
    grid-area: recommended;
    margin-block: 40px;

    @include media.md-up {
        margin-block: 20px;
    }

    @include media.lg-up {
        margin-block: 60px 80px;
    }

    @include media.lg-up {
        margin-block: 80px 120px;
    }
}

.cart__summary {
    grid-area: summary;
}

.cart__promocode {
    grid-area: promocode;
}
</style>
