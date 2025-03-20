import { CLIENT_CART } from '~/gql/queries/clientCart';
import type { CartProduct } from '~/types/Cart';
import { useQuery } from 'villus';

export const useCartStore = defineStore('cart', () => {
    const { onData, execute } = useQuery({
        query: CLIENT_CART,
    });

    const cart = ref<CartProduct[]>([]);
    const cartPrice = ref<number>(0);
    const itemsQuantity = ref<number>(0);

    const updateCartQuery = () => {
        onData((r) => {
            if (r.data) {
                cart.value = getItems<CartProduct>(r.data);

                itemsQuantity.value = cart.value.reduce((acc, value) => {
                    return acc + value.quantity;
                }, 0);

                cartPrice.value = cart.value.reduce((acc, value) => {
                    return acc + value.product.price * value.quantity;
                }, 0);
            }
        });

        execute();
    };

    updateCartQuery();

    return {
        cart,
        cartPrice,
        itemsQuantity,
        updateCartQuery,
    };
});
