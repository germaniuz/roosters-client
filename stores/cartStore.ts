import type { ChangeProductQuantityInput, CreateLocalCartProductInput } from './../types/Cart';
import { useMutation } from 'villus';
import {
    CHANGE_CART_PRODUCT_QUANTITY,
    CREATE_CLIENT_CART,
    DELETE_CLIENT_CART,
    DROP_CLIENT_CART,
} from '~/gql/mutations/clientCart';
import { CLIENT_CART } from '~/gql/queries/clientCart';
import type { CartProduct, CreateCartProductInput } from '~/types/Cart';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { skipHydrate } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const { execute: createClientCart } = useMutation(CREATE_CLIENT_CART);
    const { execute: changeProductQuantity, data: changeProductQuantityData } =
        useMutation(CHANGE_CART_PRODUCT_QUANTITY);
    const { execute: deleteClientCart } = useMutation(DELETE_CLIENT_CART);
    const { execute: dropClientCart } = useMutation(DROP_CLIENT_CART);

    const items = useStorage<CartProduct[]>('cart', [], undefined, {
        serializer: StorageSerializers.object,
    });

    const cartCount = computed(() => items.value.length);

    const fetchUserCart = async () => {
        const { onData } = useListQuery<CartProduct>(CLIENT_CART);
        onData((res) => {
            items.value = res?.clientCart?.items || [];
        });
    };

    const setLocalCartToUser = async () => {
        // if local cart is empty, fetch user cart from api and return
        if (items.value.length === 0) {
            fetchUserCart();

            return;
        }

        await dropClientCart();
        for (const item of items.value) {
            await createCartItem({
                product_category_option: {
                    product_category_option_id: item.product.id,
                    quantity: item.quantity,
                },
                cart_category_option_ingredients: item.cart_category_option_ingredients.map((ingredient) => ({
                    category_option_ingredient_id: ingredient.category_option_ingredient.id,
                    quantity: ingredient.quantity,
                })),
            });
        }
    };

    const createCartItem = async (cartProductInput: CreateCartProductInput) => {
        const res = await createClientCart(cartProductInput);
        if (res?.data?.createClientCart.items) {
            items.value = res.data.createClientCart.items;
        }
    };

    const changeCartProductQuantity = async (changeProductQuantityInput: ChangeProductQuantityInput) => {
        const itemIndex = items.value.findIndex((item) => item.id === changeProductQuantityInput.cart_item_id);
        if (itemIndex === -1) {
            throw new Error('Item not found');
        }

        const prevQuantity = items.value[itemIndex].quantity;
        items.value[itemIndex].quantity = changeProductQuantityInput.quantity;
        try {
            await changeProductQuantity(changeProductQuantityInput);
            if (changeProductQuantityData.value?.changeClientCartProductQuantity?.items) {
                items.value = changeProductQuantityData.value.changeClientCartProductQuantity.items;
            } else {
                items.value[itemIndex].quantity = prevQuantity;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const changeLocalCartProductQuantity = (changeProductQuantityInput: ChangeProductQuantityInput) => {
        const itemIndex = items.value.findIndex((item) => item.id === changeProductQuantityInput.cart_item_id);
        if (itemIndex === -1) {
            throw new Error('Item not found');
        }
        items.value[itemIndex].quantity = changeProductQuantityInput.quantity;
    };

    const removeCartItem = async (cart_item_id: number) => {
        console.log(cart_item_id);
        const res = await deleteClientCart({
            cart_item_id,
        });
        if (res?.data.deleteClientCart) {
            items.value = items.value.filter((item) => item.id !== cart_item_id);
        }
    };

    const dropCart = async () => {
        items.value = [];
        await dropClientCart();
    };

    const createLocalCartItem = (cartProductInput: CreateLocalCartProductInput) => {
        items.value.push({
            id: Math.floor(Math.random() * 9999) + 1,
            quantity: cartProductInput.quantity,
            product: cartProductInput.product,
            cart_category_option_ingredients: cartProductInput.cart_category_option_ingredients,
        });
    };

    const removeLocalCartItem = (cartProductId: number) => {
        items.value = items.value.filter((item) => item.id !== cartProductId);
    };

    const dropLocalCart = () => {
        items.value = [];
    };

    const cartPrice = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    });

    return {
        items: skipHydrate(items),
        cartCount,
        cartPrice,
        createCartItem,
        changeCartProductQuantity,
        removeCartItem,
        dropCart,
        createLocalCartItem,
        changeLocalCartProductQuantity,
        removeLocalCartItem,
        dropLocalCart,
        fetchUserCart,
        setLocalCartToUser,
    };
});
