import { useMutation } from 'villus';
import { CREATE_CLIENT_CART } from '~/gql/mutations/clientCart';
import { CLIENT_CART } from '~/gql/queries/clientCart';
import type { CartCategoryOptionIngredient, CartCategoryOptionIngredientInput, CartProduct } from '~/types/Cart';
import { StorageSerializers, useStorage } from '@vueuse/core';
import { skipHydrate } from 'pinia';
import type { ProductCategoryOption } from '~/types/Product';

export const useCartStore = defineStore('cart', () => {
    const localCart = useStorage<CartProduct[]>('cart', [], undefined, {
        serializer: StorageSerializers.object,
    });

    const items = ref<CartProduct[]>([]);
    const cartCount = computed(() => items.value.length);

    const createCartItem = (
        product_category_option_id: number,
        cart_category_option_ingredients: CartCategoryOptionIngredientInput[],
    ) => {
        const { execute } = useMutation(CREATE_CLIENT_CART);

        execute({
            product_category_option: {
                product_category_option_id: product_category_option_id,
                quantity: 1,
            },
            quantity: 1,
            cart_category_option_ingredients,
        });
    };

    const updateCartItem = () => {
        // TODO: Implement update cart item
        return;
    };

    const dropCart = () => {
        console.log('drop cart'); // TODO implement cleaning cart with request
    };

    const createLocalCartItem = (
        productCategoryOption: ProductCategoryOption,
        quantity: number,
        cartCategoryOptionIngredients: CartCategoryOptionIngredient[],
    ) => {
        items.value.push({
            id: Math.floor(Math.random() * 9999) + 1,
            quantity,
            product: productCategoryOption,
            cart_category_option_ingredients: cartCategoryOptionIngredients,
        });
        localCart.value = items.value;
    };

    const removeLocalCartItem = (cartProductId: number) => {
        items.value = items.value.filter((item) => item.id !== cartProductId);
        localCart.value = items.value;
    };

    const cartPrice = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    });

    const dropLocalCart = () => {
        items.value = [];
        localCart.value = items.value;
    };

    const fetchUserCart = async () => {
        const { onData } = useListQuery<CartProduct>(CLIENT_CART, {});
        onData((res) => {
            items.value = res.clientCart.items;
        });
    };

    return {
        items,
        cartCount,
        cartPrice,
        localCart: skipHydrate(localCart),
        createCartItem,
        updateCartItem,
        dropCart,
        createLocalCartItem,
        removeLocalCartItem,
        dropLocalCart,
        fetchUserCart,
    };
});
