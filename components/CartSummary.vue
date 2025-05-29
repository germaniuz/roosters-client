<script setup lang="ts">
import { useCartStore } from '~/stores/cartStore';
import { CREATE_ORDER_PATH } from '~/constants/routing';

type Props = {
    type?: 'action' | 'view';
};
withDefaults(defineProps<Props>(), {
    type: 'action',
});

const router = useRouter();

const { isGuest, isAuthDialogActive } = storeToRefs(useProfileStore());

const cartStore = useCartStore();
const { items, cartPrice, cartCount } = storeToRefs(cartStore);
const { dropLocalCart, dropCart } = cartStore;

const { activeShop } = storeToRefs(useDeliveryStore());
const stoplistIds = computed(() => new Set(activeShop.value?.product_stoplist.map((item) => item.id)));
console.log(stoplistIds.value);

const smOrderExpanded = ref<boolean>(false);

const checkoutCart = () => {
    if (isGuest.value) {
        isAuthDialogActive.value = true;

        return;
    }

    router.push(CREATE_ORDER_PATH);
};

const drop = () => {
    if (isGuest.value) {
        dropLocalCart();
    } else {
        dropCart();
    }
};
</script>

<template>
    <div class="cart-summary card card--grey card--p-md">
        <div class="cart-summary__top">
            <div class="cart-summary__quantity">{{ cartCount }} товар</div>
            <div v-if="type === 'action' && items.length" class="cart-summary__clean-cart" @click="drop">
                Очистить корзину <BaseIcon name="close" />
            </div>
        </div>
        <div class="cart-summary__price">
            <span>Сумма заказа</span>
            <span>{{ cartPrice }} ₽</span>
        </div>
        <div
            v-if="type === 'view' && items"
            class="cart-summary__items"
            :class="[!smOrderExpanded ? 'cart-summary__items--collapsed' : '']"
        >
            <button class="cart-summary__expand-btn" @click="smOrderExpanded = !smOrderExpanded">Состав заказа</button>
            <div class="cart-summary__items-inner">
                <div>
                    <div v-for="cartProduct in items" :key="cartProduct.product.id" class="cart-summary__item">
                        <div class="cart-summary__item-title">
                            <span>{{ cartProduct.product.product.name }} x {{ cartProduct.quantity }}</span>
                            <div class="cart-summary__item-price">
                                {{
                                    cartProduct.product.price * cartProduct.quantity +
                                    cartProduct.cart_category_option_ingredients.reduce(
                                        (acc, item) => acc + item.category_option_ingredient.price * item.quantity,
                                        0,
                                    )
                                }}
                                ₽
                            </div>
                        </div>
                        <div class="cart-summary__item-detail">
                            <div
                                v-for="cartIngredient in cartProduct.cart_category_option_ingredients"
                                :key="cartIngredient.category_option_ingredient.id"
                                class="cart-summary__item-detail-text"
                            >
                                {{ cartIngredient.category_option_ingredient.ingredient.name }}
                                <i class="icon-close"></i> {{ cartIngredient.quantity }} =
                                {{ cartIngredient.category_option_ingredient.price * cartIngredient.quantity }} ₽
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <span class="cart-summary__info-title">Начислим баллов <span class="cart-summary__info-icon">i</span></span>
            <span class="cart-summary__info-data cart-summary__info-data--add">+1 <BaseIcon name="pizza-slice" /></span>
        </div>
        <div class="cart-summary__final-price">
            Итого
            <span>{{ cartPrice }} ₽</span>
        </div>
        <BaseButton
            v-if="type === 'action'"
            :modifiers="['primary']"
            class="cart-summary__btn"
            :disabled="!items.length"
            @click="checkoutCart"
        >
            Оформить
        </BaseButton>
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
    color: var(--c-grey90);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(18);
    font-weight: 400;
    line-height: functions.rem(24);
}

.cart-summary__clean-cart {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--c-grey40);
    font-family: var(--f-base), sans-serif;
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
    font-family: var(--f-base), sans-serif;
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

.cart-summary__items {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--c-grey30);
    margin-bottom: 20px;
}

.cart-summary__items-inner {
    position: relative;
    display: grid;
    transition: all 0.5s ease-in-out;
    line-height: 1.4;
    margin-block: 10px;
    grid-template-rows: 1fr;

    .cart-summary__items--collapsed & {
        @include media.md-down {
            grid-template-rows: 0fr;
            margin-block: 0;
        }
    }

    & > div {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}

.cart-summary__expand-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: var(--c-grey80);
    font-family: var(--f-headings);
    font-size: functions.rem(14);
    font-weight: 500;
    line-height: 1.35;
    background-color: unset;
    width: 100%;
    cursor: pointer;

    @include media.lg-up {
        display: none;
    }

    &::after {
        content: '\e800';
        font-family: var(--f-fontello);
        font-size: functions.rem(8);
        color: var(--c-grey80);
        transform: rotate(90deg);
        transition: all 0.5s;

        .cart-summary__items--collapsed & {
            transform: rotate(0deg);
        }
    }
}

.cart-summary__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cart-summary__item-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: var(--c-grey80);
    font-family: var(--f-headings);
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 500;

    @include media.lg-up {
        font-size: functions.rem(14);
        line-height: functions.rem(17);
    }

    span {
        text-transform: uppercase;
    }
}

.cart-summary__item-price {
    font-family: var(--f-base), sans-serif;
}

.cart-summary__item-detail {
    color: var(--c-grey80);
    font-family: var(--f-headings);
    font-size: functions.rem(12);
    font-weight: 500;
    line-height: 1.35;
}

.cart-summary__item-detail-text {
    color: var(--c-grey50);
}

.cart-summary__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
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

.cart-summary__info-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
}

.cart-summary__info-icon {
    color: var(--c-grey80);
    border: 1px solid var(--c-grey40);
    border-radius: 50px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        color: var(--c-secondary);
        border-color: var(--c-secondary);
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
    margin-top: 20px;
    color: var(--c-grey90);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    line-height: functions.rem(19);
    font-weight: 400;

    span {
        color: var(--c-grey80);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(18);
        line-height: functions.rem(24);
        font-weight: 600;
        font-style: italic;
    }
}

.cart-summary__btn {
    width: 100%;
    margin-top: 20px;
    font-size: functions.rem(16);
}
</style>
