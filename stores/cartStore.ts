import { CLIENT_CART } from '~/gql/queries/clientCart';
import type { CartProduct } from '~/types/Cart';

export const useCartStore = defineStore('cart', () => {
    const { onResult, refetch } = useQuery(CLIENT_CART);

    const cart = ref<CartProduct[] | null>(null);
    const cartSum = ref<number | null>(null);

    const updateCartQuery = () => {
        onResult((r) => {
            if (r.data) {
                cart.value = getItems<CartProduct>(r.data);
                cartSum.value = cart.value.reduce((acc, value) => {
                    return acc + value.product.price * value.quantity;
                }, 0);
            }
        });

        refetch();
    };

    updateCartQuery();

    return {
        cartSum,
        cart,
        updateCartQuery,
    };
});
