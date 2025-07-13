import type { ChangeProductQuantityInput, CreateLocalCartProductInput } from './../types/Cart';
import { useMutation, useQuery } from 'villus';
import {
    CHANGE_CART_PRODUCT_QUANTITY,
    CREATE_CLIENT_CART,
    DELETE_CLIENT_CART,
    DROP_CLIENT_CART,
} from '~/gql/mutations/clientCart';
import { CLIENT_CART } from '~/gql/queries/clientCart';
import type { CartProduct, CreateCartProductInput } from '~/types/Cart';
import type { AppliedDiscount, AvailableDiscount, CartTotals } from '~/types/Discount';
import { APPLY_PROMOCODE, REMOVE_PROMOCODE } from '~/gql/mutations/discount';
import { AVAILABLE_DISCOUNTS_QUERY } from '~/gql/queries/discount';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { skipHydrate } from 'pinia';

export const useCartStore = defineStore('cart', () => {
    const { execute: createClientCart } = useMutation(CREATE_CLIENT_CART);
    const { execute: changeProductQuantity, data: changeProductQuantityData } =
        useMutation(CHANGE_CART_PRODUCT_QUANTITY);
    const { execute: deleteClientCart } = useMutation(DELETE_CLIENT_CART);
    const { execute: dropClientCart } = useMutation(DROP_CLIENT_CART);
    const { execute: applyPromocodeMutation } = useMutation(APPLY_PROMOCODE);
    const { execute: removePromocodeMutation } = useMutation(REMOVE_PROMOCODE);

    const items = useStorage<CartProduct[]>('cart', [], undefined, {
        serializer: StorageSerializers.object,
    });

    const appliedDiscounts = ref<AppliedDiscount[]>([]);
    const availableDiscounts = ref<AvailableDiscount[]>([]);
    const cartTotals = ref<CartTotals | null>(null);

    const cartCount = computed(() => items.value.length);

    const fetchUserCart = async () => {
        const { onData } = useListQuery<CartProduct>(CLIENT_CART);
        onData((res) => {
            items.value = res?.clientCart?.items || [];
            appliedDiscounts.value = res?.clientCart?.applied_discounts || [];
            availableDiscounts.value = res?.clientCart?.available_automatic_discounts || [];
            cartTotals.value = res?.clientCart?.totals || null;
        });
    };

    const fetchAvailableDiscounts = async (code?: string) => {
        const { data } = await useQuery<{ clientAvailableCartDiscounts: AvailableDiscount[] }>({
            query: AVAILABLE_DISCOUNTS_QUERY,
            variables: { promocode: code },
        });
        if (data.value?.clientAvailableCartDiscounts) {
            availableDiscounts.value = data.value.clientAvailableCartDiscounts;
        }
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
                exclude_product_ingredient_ids: item.exclude_product_ingredients?.map((ingredient) => ingredient.id),
                cart_product_unique_ingredients:
                    item.cart_product_unique_ingredients?.map(
                        (ingredient) => ingredient.category_option_ingredient.id,
                    ) || [],
            });
        }
    };

    const createCartItem = async (cartProductInput: CreateCartProductInput) => {
        const res = await createClientCart(cartProductInput);
        if (res?.data?.createClientCart) {
            items.value = res.data.createClientCart;
            // Refresh all cart data including totals and discounts
            await fetchUserCart();
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
            if (changeProductQuantityData.value?.changeClientCartItemQuantity) {
                items.value = changeProductQuantityData.value.changeClientCartItemQuantity;
                // Refresh all cart data including totals and discounts
                await fetchUserCart();
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
            // Refresh all cart data including totals and discounts
            await fetchUserCart();
        }
    };

    const dropCart = async () => {
        items.value = [];
        appliedDiscounts.value = [];
        availableDiscounts.value = [];
        cartTotals.value = null;
        await dropClientCart();
    };

    const createLocalCartItem = (cartProductInput: CreateLocalCartProductInput) => {
        items.value.push({
            id: Math.floor(Math.random() * 9999) + 1,
            quantity: cartProductInput.quantity,
            product: cartProductInput.product,
            cart_category_option_ingredients: cartProductInput.cart_category_option_ingredients,
            exclude_product_ingredients: cartProductInput.exclude_product_ingredients,
            cart_product_unique_ingredients: cartProductInput.cart_product_unique_ingredients,
        });
    };

    const removeLocalCartItem = (cartProductId: number) => {
        items.value = items.value.filter((item) => item.id !== cartProductId);
    };

    const dropLocalCart = () => {
        items.value = [];
    };

    const cartPrice = computed(() => {
        if (cartTotals.value) {
            return cartTotals.value.final_amount;
        }
        return items.value.reduce((total, item) => {
            return (
                total +
                item.product.price * item.quantity +
                item.cart_category_option_ingredients.reduce(
                    (acc, item) => acc + item.quantity * item.category_option_ingredient.price,
                    0,
                )
            );
        }, 0);
    });

    const applyPromocode = async (code: string) => {
        const res = await applyPromocodeMutation({ code });
        const result = res?.data?.applyClientCartPromocodeDiscount;
        if (result?.success) {
            if (result.discount) {
                appliedDiscounts.value.push(result.discount);
            }
            if (result.totals) {
                cartTotals.value = result.totals;
            }
        }
        if (result?.error_message) {
            console.error(result.error_message);
        }
    };

    const removePromocode = async (id: number) => {
        const res = await removePromocodeMutation({ promocode_id: id });
        const result = res?.data?.removeClientCartPromocodeDiscount;
        if (result?.success) {
            appliedDiscounts.value = appliedDiscounts.value.filter((d) => d.id !== id);
            if (result.totals) {
                cartTotals.value = result.totals;
            }
        }
        if (result?.error_message) {
            console.error(result.error_message);
        }
    };

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
        appliedDiscounts,
        availableDiscounts,
        fetchAvailableDiscounts,
        applyPromocode,
        removePromocode,
        cartTotals,
    };
});
