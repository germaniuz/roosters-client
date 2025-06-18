<script setup lang="ts">
import type { CartProduct } from '~/types/Cart';
import { useDebounceFn } from '@vueuse/core';

const { activeShop, isActiveShopWorking, isDeliveryChooserOpen } = storeToRefs(useDeliveryStore());

type Props = {
    cartProduct: CartProduct;
};

const props = defineProps<Props>();
const { changeCartProductQuantity, removeCartItem, changeLocalCartProductQuantity, removeLocalCartItem } =
    useCartStore();
const { isAuthenticated, isGuest } = storeToRefs(useProfileStore());

const totalPrice = computed(() => {
    return (
        props.cartProduct.product.price * props.cartProduct.quantity +
        props.cartProduct.cart_category_option_ingredients.reduce(
            (acc, item) => acc + item.category_option_ingredient.price * item.quantity,
            0,
        )
    );
});

const itemInStopList = computed(() => {
    return !!activeShop.value?.product_stoplist.find((stopProduct) => {
        return stopProduct.product.id === props.cartProduct.product.product.id;
    });
});

const increaseQuantity = async () => {
    changeLocalCartProductQuantity({
        cart_item_id: props.cartProduct.id,
        quantity: props.cartProduct.quantity + 1,
    });
    if (isAuthenticated.value) {
        await updateCartProductQuantity();
    }
};

const updateCartProductQuantity = useDebounceFn(
    () => {
        changeCartProductQuantity({
            cart_item_id: props.cartProduct.id,
            quantity: props.cartProduct.quantity,
        });
    },
    1000,
    { maxWait: 10000 },
);

const decreaseQuantity = async () => {
    if (props.cartProduct.quantity === 1) {
        removeLocalCartItem(props.cartProduct.id);

        return;
    }

    changeLocalCartProductQuantity({
        cart_item_id: props.cartProduct.id,
        quantity: props.cartProduct.quantity - 1,
    });

    if (isAuthenticated.value) {
        await updateCartProductQuantity();
    }
};

const removeFromCart = async () => {
    if (isGuest.value) {
        removeLocalCartItem(props.cartProduct.id);
    } else {
        await removeCartItem(props.cartProduct.id);
    }
};

const price_old = ref<number>(1500);
</script>

<template>
    <div class="cart-item">
        <div class="cart-item__img">
            <img
                src="https://api.roosters-dev.ru/downloads/df8/df8372c7403f15a75b045bdf578f3ecf.png"
                :alt="cartProduct.product.product.file?.url"
            />
            <!--            <img :src="cartProduct.product.product.file?.url" alt="" />-->
        </div>
        <div class="cart-item__content">
            <div class="cart-item__title">
                <span>{{ cartProduct.product.product.name }}</span>
                <div class="cart-item__action-btns">
                    <BaseIcon class="cart-item__remove-btn" name="close" @click="removeFromCart" />
                </div>
            </div>
            <div class="cart-item__details">
                <span>{{ cartProduct.product.category_option?.option.description }}</span>
                <div v-if="cartProduct.cart_category_option_ingredients.length">
                    <div class="cart-item__detail-title">Добавки</div>
                    <div
                        v-for="productIngredient in cartProduct.cart_category_option_ingredients"
                        :key="productIngredient.category_option_ingredient.id"
                        class="cart-item__detail-text"
                    >
                        {{ productIngredient.category_option_ingredient.ingredient.name }} <i class="icon-close"></i>
                        {{ productIngredient.quantity }}
                    </div>
                </div>
            </div>
            <div class="cart-item__quantity-price">
                <QuantityHandler
                    :quantity="cartProduct.quantity"
                    :increase-handler="increaseQuantity"
                    :decrease-handler="decreaseQuantity"
                />
                <div class="cart-item__price">
                    <span v-if="false" class="cart-item__price-old">{{ price_old }} ₽</span>
                    {{ totalPrice }} ₽
                </div>
            </div>
        </div>
        <div v-if="!isActiveShopWorking || itemInStopList" class="cart-item__stop-item">
            <span>
                <br /><br />
                <NuxtLink class="btn btn--link-primary" to="/">Выберите другой товар </NuxtLink> или
                <BaseButton :modifiers="['link-primary']" @click="isDeliveryChooserOpen = true">
                    выберите другой адрес.
                </BaseButton>
                и
                <BaseButton :modifiers="['link-primary']" @click="removeFromCart">Удалите этот товар</BaseButton>
                чтобы продолжить</span
            >
            <span class="cart-item__stop-text">Извините, данный товар временно недоступен в этой пиццерии.</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/helpers/media';
@use '@/assets/styles/helpers/functions';

.cart-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    position: relative;
    padding: 5px;

    @include media.lg-up {
        gap: 30px;
    }
}

.cart-item__img {
    width: 124px;
    aspect-ratio: 1;

    @include media.lg-up {
        width: 82px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.cart-item__content {
    width: 100%;
}

.cart-item__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    span {
        color: var(--c-grey90);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(16);
        line-height: functions.rem(19);
        font-weight: 500;
    }
}

.cart-item__details {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 8px;

    @include media.md-up {
        gap: 8px;
    }

    @include media.lg-up {
        gap: 20px;
        margin-bottom: 30px;
    }

    span {
        font-size: functions.rem(12);
        color: var(--c-grey80);
    }
}

.cart-item__quantity-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.cart-item__detail-title {
    color: var(--c-grey70);
    font-family: var(--f-headings), sans-serif;
    font-size: functions.rem(10);
    font-weight: 500;
    line-height: 1.3;

    @include media.md-up {
        font-size: functions.rem(11);
    }

    @include media.lg-up {
        font-size: functions.rem(14);
    }
}

.cart-item__detail-text {
    color: var(--c-grey50);
    font-family: var(--f-headings), sans-serif;
    font-size: functions.rem(10);
    font-weight: 500;
    line-height: 1.3;

    @include media.md-up {
        font-size: functions.rem(11);
    }

    @include media.lg-up {
        font-size: functions.rem(14);
    }
}

.cart-item__action-btns {
    display: flex;
    flex-direction: row;
}

.cart-item__price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: var(--c-grey80);
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(16);
    font-weight: 600;
    line-height: functions.rem(19);
    font-style: italic;
    margin-top: auto;

    @include media.lg-up {
        font-size: functions.rem(18);
        line-height: functions.rem(21);
        flex-direction: row;
        gap: 30px;
    }
}

.cart-item__price-old {
    position: relative;
    font-size: functions.rem(12);
    line-height: functions.rem(14);
    font-weight: 500;
    color: var(--c-grey50);

    @include media.lg-up {
        font-size: functions.rem(14);
        line-height: functions.rem(17);
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        translate: 0 -50%;
        width: 75%;
        border-bottom: 1px solid var(--c-grey50);
        transform: rotate(-12deg);
    }
}

.cart-item__edit-btn {
    margin-left: auto;
    font-size: functions.rem(24);
    color: var(--c-grey50);
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        color: var(--c-secondary);
    }
}

.cart-item__remove-btn {
    font-size: functions.rem(24);
    color: var(--c-primary);
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        color: var(--c-secondary);
    }
}

.cart-item__stop-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: color(from var(--c-secondary-extra-light) srgb r g b / 0.5);
    //background-color: rgba(255, 255, 255, 0.5); TODO: обсудить - какой лучше вариант
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--f-base), sans-serif;
    font-size: functions.rem(14);
    padding: 40px;
    backdrop-filter: blur(2px);
}
</style>
