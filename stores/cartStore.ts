import { useMutation } from 'villus';
import { CREATE_CLIENT_CART } from '~/gql/mutations/clientCart';
import { CLIENT_CART } from '~/gql/queries/clientCart';
import type { CartCategoryOptionIngredientInput, CartProduct } from '~/types/Cart';

export const useCartStore = defineStore('cart', () => {
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

    const cartPrice = computed(() => {
        return items.value.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    });

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
        createCartItem,
        updateCartItem,
        fetchUserCart,
    };
});
