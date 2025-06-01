<script lang="ts" setup>
import CartSummary from '~/components/CartSummary.vue';

const { items, cartPrice, cartCount } = storeToRefs(useCartStore());
</script>

<template>
    <ClientOnly>
        <div class="container container--sm cart">
            <h1 class="h1">Корзина <span class="h1--grey h1--md-hidden">- Оформление - Заказ принят</span></h1>
            <div class="cart__top-summary">
                <img src="/images/cart-primary.svg" alt="Корзина" /> {{ cartCount }} товаров на сумму
                <span>&nbsp;{{ cartPrice }}</span
                >&nbsp;₽
            </div>
            <div class="cart__grid">
                <div v-if="items.length" class="cart__items">
                    <CartItem v-for="cartProduct in items" :key="cartProduct.product.id" :cart-product="cartProduct" />
                    <PopularItems title="Рекомендуем добавить" class="cart__recommended" />
                </div>
                <BaseEmptyMessage
                    v-else
                    message="Тут пока пусто, добавьте что-нибудь из меню, а мы приготовим ваш заказ."
                />
                <ThePromocode class="cart__promocode" />
                <CartSummary class="cart__summary" />
            </div>
        </div>
    </ClientOnly>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.cart .h1 {
    @include media.md-down {
        display: none;
    }
}

.cart__top-summary {
    font-size: functions.rem(18);
    color: var(--c-grey90);
    font-weight: 500;
    margin-bottom: 20px;
    font-family: var(--f-headings), sans-serif;
    align-items: center;
    display: flex;

    span {
        font-style: italic;
    }

    img {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        margin-right: 12px;
    }
}

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
    margin-bottom: 30px;

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
    margin-block: 0;

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
