<script setup lang="ts">
import { CHANGE_CART_PRODUCT_QUANTITY, DELETE_CLIENT_CART } from '~/gql/mutations/clientCart';
import type { CartProduct } from '~/types/Cart';
import { useCartStore } from '~/stores/cartStore';
import { useMutation } from 'villus';

type Props = {
    cartProduct: CartProduct;
};

const props = defineProps<Props>();
const { updateCartItem, removeLocalCartItem } = useCartStore();
const { isGuest } = storeToRefs(useProfileStore());

const { execute: changeCartQuantity } = useMutation(CHANGE_CART_PRODUCT_QUANTITY);
const { execute: removeItemFromCart } = useMutation(DELETE_CLIENT_CART);

const increaseQuantity = async () => {
    await changeCartQuantity({
        product_category_option: {
            product_category_option_id: props.cartProduct.product.id,
            quantity: 1,
        },
    }).then(() => {
        updateCartItem();
    });
};

const decreaseQuantity = async () => {
    await changeCartQuantity({
        product_category_option: {
            product_category_option_id: props.cartProduct.product.id,
            quantity: -1,
        },
    }).then(() => {
        updateCartItem();
    });
};

const removeFromCart = async () => {
    if (isGuest.value) {
        removeLocalCartItem(props.cartProduct.id);
    } else {
        await removeItemFromCart({
            product_category_option_id: props.cartProduct.product.id,
        }).then(() => {
            updateCartItem();
        });
    }
};

const price_old = ref<number>(1500);
</script>

<template>
    <div class="cart-item">
        <div class="cart-item__img">
            <img :src="cartProduct.product.product.file?.url" alt="" />
        </div>
        <div class="cart-item__content">
            <div class="cart-item__title">
                <span>{{ cartProduct.product.product.name }}</span>
                <div class="cart-item__action-btns">
                    <BaseIcon class="cart-item__remove-btn" name="close" @click="removeFromCart" />
                </div>
            </div>
            <div class="cart-item__details">
                <div class="cart-item__detail">
                    <div class="cart-item__detail-title">Ингредиенты</div>
                    <div
                        v-for="productIngredient in cartProduct.product.product.product_ingredients"
                        :key="productIngredient.id"
                        class="cart-item__detail-text"
                    >
                        {{ productIngredient.ingredient.description }}
                    </div>
                </div>
            </div>
            <div class="cart-item__quantity-price">
                <div class="cart-item__quantity">
                    <div class="cart-item__quantity-btn" @click="decreaseQuantity">-</div>
                    {{ cartProduct.quantity }}
                    <div class="cart-item__quantity-btn" @click="increaseQuantity">+</div>
                </div>
                <div class="cart-item__price">
                    <span v-if="price_old" class="cart-item__price-old">{{ price_old }} ₽</span>
                    {{ cartProduct.product.price }} ₽
                </div>
            </div>
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

    @include media.lg-up {
        gap: 30px;
    }
}

.cart-item__img {
    width: 70px;
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
    margin-bottom: 8px;

    span {
        color: var(--c-grey70);
        font-family: var(--f-base), sans-serif;
        font-size: functions.rem(16);
        line-height: functions.rem(19);
        font-weight: 600;
    }
}

.cart-item__details {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;

    @include media.md-up {
        gap: 8px;
    }

    @include media.lg-up {
        gap: 20px;
        margin-bottom: 30px;
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

.cart-item__quantity {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    color: var(--c-grey80);
    font-size: functions.rem(14);
    line-height: functions.rem(17);

    @include media.lg-up {
        font-size: functions.rem(16);
        line-height: functions.rem(19);
    }
}

.cart-item__quantity-btn {
    width: 32px;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--c-grey30);
    border-radius: var(--b-radius-round);
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
        border-color: var(--c-secondary);
        color: var(--c-secondary);
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
</style>
